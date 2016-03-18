import Server from 'socket.io';
import ArticlePoller from './articlePoller';
import SectionPoller from './sectionPoller';
import newrelic from 'newrelic';
const ravenClient = require('./ravenClient').getInstance();


/**
 * @param {app} Express App
 */
export default function RealtimeServer(app) {
  let io = Server(app);
  let pollers = {};
  this.pollers = pollers;
  // this is socket.
  function unsubscribe(pollerId) {
    if (pollerId) {
      this.leave(pollerId);
    }

    Object.keys(pollers).forEach((id) => {
      //if the room is empty,
      //delete the poller
      let isEmpty = !(io.sockets.adapter.rooms[id]);
      if (isEmpty) {
        let poller = pollers[id];
        poller.removeAllListeners('updatedData');
        poller.removeAllListeners('error');
        delete pollers[id];
        poller.stop();
      }
    });
  }

  io.on('connection', (socket) => {
    // find the room and add the user to it
    socket.on('subscribeToArticle', newrelic.createWebTransaction('/websocket/subscribeToArticle', (query) => {
      const uuid = query.uuid;
      const timespan = query.timespan;
      const pollerId = uuid + timespan;
      // this adds the user to the room
      socket.join(pollerId, () => {
        // if there isn't a poller for that room
        // create it
        if (!pollers[pollerId]) createPoller('article', query);
        newrelic.endTransaction();
      });
    }));


    socket.on('subscribeToSection', newrelic.createWebTransaction('/websocket/subscribeToSection', (query) => {
      const section = query.section;
      const timespan = query.timespan;
      const pollerId = section + timespan;
      // this adds the user to the room
      socket.join(pollerId, () => {
        // if there isn't a poller for that room
        // create it
        if (!pollers[pollerId]) createPoller('section', query);
        newrelic.endTransaction();
      });
    }));

    socket.on('unsubscribeFromArticle', newrelic.createWebTransaction('/websocket/unsubscribeFromArticle', (query) => {
      const pollerId = query.uuid + query.timespan;
      unsubscribe.call(socket, pollerId);
      newrelic.endTransaction();
    }));

    socket.on('unsubscribeFromSection', newrelic.createWebTransaction('/websocket/unsubscribeFromSection', (query) => {
      const pollerId = query.section + query.timespan;
      unsubscribe.call(socket, pollerId);
      newrelic.endTransaction();
    }));

    socket.on('disconnect', unsubscribe);

    socket.on('error', newrelic.createWebTransaction('/websocket/error', (error) => {
      newrelic.endTransaction();
      ravenClient.captureException(error);
    }));
  });

  /**
   * @param {uuid} string - the uuid of the article to poll about
   */
  function createPoller(type, query) {
    let pollerId, poller;
    switch (type) {

      case 'article':
        pollerId = query.uuid + query.timespan;
        poller = new ArticlePoller(query);
        break;
      case 'section':
        pollerId = query.section + query.timespan;
        poller = new SectionPoller(query);
        break;
      default:
        return;
    }

    poller.on('updatedData', (data) => {
      io.to(pollerId).emit('updatedData', data);
    });
    poller.on('error', (error) => {
      io.to(pollerId).emit('error', error);
      ravenClient.captureException(error);
    });
    pollers[pollerId] = poller;
  }

}

RealtimeServer.prototype.getNumberOfActivePollers = function() {
  return Object.keys(this.pollers).length;
}
