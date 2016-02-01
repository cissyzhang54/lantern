import Server from 'socket.io';
import ArticlePoller from './articlePoller';

/**
 * @param {app} Express App
 */
export default function RealtimeServer(app) {
  let io = Server(app);
  let articlePollers = {};
  this.pollers = articlePollers;

  function unsubscribe(query) {
    if (query) {
      this.leave(query.uuid + query.timespan);
    }

    Object.keys(articlePollers).forEach((pollerId) => {
      //if the room is empty,
      //delete the poller
      let isEmpty = !(io.sockets.adapter.rooms[pollerId]);
      if (isEmpty) {
        let poller = articlePollers[pollerId];
        poller.removeAllListeners('updatedArticleData');
        poller.removeAllListeners('error');
        delete articlePollers[pollerId];
        poller.stop();
      }
    });
  }

  io.on('connection', (socket) => {
    // find the room and add the user to it
    socket.on('subscribeToArticle', (query) => {
      const uuid = query.uuid;
      const timespan = query.timespan;
      // this adds the user to the room
      socket.join(uuid + timespan, () => {
        // if there isn't a poller for that room
        // create it
        if (!articlePollers[uuid+timespan]) createPoller(uuid, timespan);
      });
    })

    socket.on('unsubscribeFromArticle', unsubscribe.bind(socket));

    socket.on('disconnect', unsubscribe);
  });

  /**
   * @param {uuid} string - the uuid of the article to poll about
   */
  function createPoller(uuid, timespan) {
    const pollerId = uuid + timespan;
    articlePollers[pollerId] = new ArticlePoller(uuid, timespan);
    articlePollers[pollerId].on('updatedArticleData', (data) => {
      io.to(pollerId).emit('updatedArticleData', data);
    });
    articlePollers[pollerId].on('error', (error) => {
      io.to(pollerId).emit('error', error);
    });
  }

}
