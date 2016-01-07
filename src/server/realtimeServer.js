import Server from 'socket.io';
import ArticlePoller from './articlePoller';

/**
 * @param {app} Express App
 */
export default function RealtimeServer(app) {
  let io = Server(app);
  let articlePollers = {};
  this.pollers = articlePollers;

  io.on('connection', (socket) => {
    // find the room and add the user to it
    socket.on('subscribeToArticle', (uuid) => {
      // this adds the user to the room
      socket.join(uuid, () => {
        // if there isn't a poller for that room
        // create it
        if (!articlePollers[uuid]) createPoller(uuid);
      });
    })

    socket.on('disconnect', () => {
      Object.keys(articlePollers).forEach((uuid) => {
        //if the room is empty,
        //delet the poller
        let isEmpty = !(io.sockets.adapter.rooms[uuid]);
        if (isEmpty) {
          let poller = articlePollers[uuid];
          poller.removeAllListeners('updatedArticleData');
          poller.removeAllListeners('error');
          delete articlePollers[uuid];
          poller.stop();
        }
      });
    });
  });

  /**
   * @param {uuid} string - the uuid of the article to poll about
   */
  function createPoller(uuid) {
    articlePollers[uuid] = new ArticlePoller(uuid);
    articlePollers[uuid].on('updatedArticleData', (data) => {
      io.to(uuid).emit('updatedArticleData', data);
    });
    articlePollers[uuid].on('error', (error) => {
      io.to(uuid).emit('error', error);
    });
  }

}
