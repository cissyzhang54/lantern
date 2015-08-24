let data = {
  article: {
    title: "some title",
    pageViews: 22001,
    timeOnPage: 170,
    socialReaders: 876,
    readTimes: makeTimes(),
    devices: makeDevices(),
    apps: makeApps()
  }
};

function makeTimes() {
  let times = 100;
  let date = new Date().getTime();
  var dataArray = [];

  for (var i = 0; i < times; i++) {
    dataArray.push( {
      time: new Date(date + (i * 1000 * 60)),
      value: (Math.random() * 1000) | 0
    });
  }
  return dataArray;
}

function makeDevices() {
  var mob = Math.random() * 100 | 0;
  return {
    mobile: mob,
    desktop: 100 - mob
  };
}

function makeApps() {
  let x = Math.random();
  let y = Math.random();
  let z = Math.random();

  let tot = x + y + z;

  return {
    ftCom: (x/tot * 100) | 0,
    webApp: (y/tot * 100) | 0,
    next: (z/tot * 100) | 0
  };
}

export default data;
