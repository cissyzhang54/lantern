import RealtimeServer from '../../src/server/realtimeServer.js';
import ioClient from 'socket.io-client';
import express from 'express';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Realtime Server', () => {

  let app;
  let server;
  let rtServer;
  let client;
  let sandbox;
  const port = 3666;
  const UUID = '3068994c-bf71-11e5-9fdb-87b8d15baec2';

  before((done) => {
    app = express();
    server = require('http').createServer(app);
    sandbox = sinon.sandbox.create();

    server.listen(port, () => {
      //console.log('Server listening at port %d', port);
      done();
    });

    rtServer = new RealtimeServer(server);
  });

  beforeEach((done) => {

    client = ioClient(`http://localhost:${port}`);
    client.on('connect', () => {
      //console.log('connected!');
      done();
    })

  })

  afterEach((done) => {
    client.on('disconnect', () => {
      done();
    })
    client.disconnect();
  })

  after(() => {
    sandbox.restore();
  })

  it('should poll for article data', function (done) {
    this.timeout(10000)
    const query = {
      uuid: UUID,
      timespan: '1h'
    };
    client.on('updatedData', () => {
      client.emit('unsubscribeFromArticle', query);
      done();
    });
    client.on('error', done);
    client.emit('subscribeToArticle', query);
  });

  it('should poll for section data', function (done) {
    this.timeout(10000)
    const query = {
      section: 'World' ,
      timespan: '1h'
    };
    client.on('updatedData', () => {
      client.emit('unsubscribeFromSection', query);
      done();
    });
    client.on('error', done);
    client.emit('subscribeToSection', query);
  });

  it('should clean up pollers when there are no clients', function () {
    expect(rtServer.pollers).to.be.empty;
  });


});
