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
      socket.join(uuid, () => {
        if (!articlePollers[uuid]) createPoller(uuid);
      });
      // if the poller doesn't exist, we create
      // one
    })

    socket.on('disconnect', () => {
      Object.keys(articlePollers).forEach((uuid) => {
        //if the room is empty,
        //delet the poller
        let isEmpty = !(io.sockets.adapter.rooms[uuid]);
        if (isEmpty) {
          let poller = articlePollers[uuid];
          delete articlePollers[uuid];
          poller.stop();
        }
      });
    });
  });

  function createPoller(uuid) {
    articlePollers[uuid] = new ArticlePoller(uuid);
    articlePollers[uuid].on('updatedArticleData', (data) => {
      io.to(uuid).emit('updatedArticleData', data);
    });
    articlePollers[uuid].on('error', (error) => {
      io.to(uuid).emit('error', error);
    })
  }

}
