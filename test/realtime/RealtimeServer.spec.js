import RealtimeServer from '../../src/server/realtimeServer.js';
import ioClient from 'socket.io-client';
import express from 'express';
import {expect} from 'chai';
import sinon from 'sinon';
import ArticlePoller from '../../src/server/articlePoller';

describe('Realtime Server', () => {

  let app;
  let server;
  let rtServer;
  let client;
  let sandbox;
  const UUID = '3068994c-bf71-11e5-9fdb-87b8d15baec2';

  before((done) => {
    app = express();
    server = require('http').createServer(app);
    const port = 3666;
    sandbox = sinon.sandbox.create();

    server.listen(port, () => {
      console.log('Server listening at port %d', port);

      client = ioClient(`http://localhost:${port}`);
      client.on('connect', () => {
        console.log('connected!');
        done();
      })
    });

    rtServer = new RealtimeServer(server);
  });

  after(() => {
    sandbox.restore();
  });

  it('should poll for data', function (done) {
    this.timeout(10000)

    client.on('updatedArticleData', (data) => {
      done();
    });
    client.on('error', done);
    client.emit('subscribeToArticle', UUID);
  });

  it('should clean up pollers when there are no clients', (done) => {
    let poller = rtServer.pollers[UUID];
    sandbox.stub(ArticlePoller.prototype, 'stop', () => {
      expect(rtServer.pollers).to.be.empty;
      done();
    });

    client.disconnect();
  });


});
