/*eslint-env node*/
const raven = require('raven');

const SENTRY_DSN = 'https://' + process.env.RAVEN_KEY + '@app.getsentry.com/' + process.env.RAVEN_APP_ID;
let RELEASE_ID = process.env.HEROKU_SLUG_COMMIT;

if (!RELEASE_ID) {
  RELEASE_ID = 'local-development'
} else {
  RELEASE_ID = RELEASE_ID.substr(0, 10);
}

let ravenClient;
export default {
  getInstance : function() {
    if (!ravenClient) {
      ravenClient = new raven.Client(SENTRY_DSN, {
        release: RELEASE_ID
      });
      ravenClient.patchGlobal();
    }
    return ravenClient;
  }
}
