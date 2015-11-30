import request from "superagent";
import {XmlEntities} from 'html-entities';
import {createClient as createRedisClient} from 'redis';

let redisClient = {};
let useClient;
if (process.env.USE_MEMORY_STORE === "true") {
  useClient = false;
} else {
  useClient = true;
  let redisUrl = process.env.OPENREDIS_URL || "redis://:test@localhost:6379";
  redisClient = createRedisClient(redisUrl);
}

const STORE_NAMESPACE = 'urls:'

let entities = new XmlEntities();

export default function getTitleForUrl(url) {
  return getFromRedis(url)
    .then((title) => {
      return title
    })
    .catch((err) => {
      return getFromCrawling(url)
    });
}


function getFromRedis(url) {
  return new Promise((resolve, reject) => {
    if (!useClient) {
      return reject('not using client')
    }
    redisClient.get(STORE_NAMESPACE + url, (err, reply) => {
      if (err) {
        return reject(err);
      }
      if (!reply) return reject('Unknown');
      return resolve(reply);
    });
  });

}

function getFromCrawling(url) {
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((err, res) => {
        if (err) {
          if (useClient) redisClient.set(STORE_NAMESPACE + url, 'Unknown');
          return resolve('Unknown');
        }
        const title = getTitleFromHTML(res.text);
        if (useClient) {
          redisClient.set(STORE_NAMESPACE + url, title);
        }
        return resolve(title);
      });
  });
}

export function getTitleFromHTML (html) {
  const matches = html.match(/<title>(.*?)<\/title>/i);
  return entities.decode(matches[1]);
}

