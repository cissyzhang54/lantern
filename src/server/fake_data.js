let data = function() {
  return {
      article: {
      title: "some title",
      author: "Chris Evans",
      published: "25-Aug-2015",
      pageViews: (Math.random() * 1e5) | 0,
      timeOnPage: (Math.random() * 1e3) | 0,
      socialReaders: (Math.random() * 1e3) | 0,
      readTimes: makeTimes(),
      devices: makeDevices(),
      apps: makeApps()
    }
  }
};

function makeTimes() {
  let times = 30;
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
  var sum = nRandomConstantSum(3, 100);

  return {
    ftCom: sum[0],
    webApp: sum[1],
    next: sum[2]
  };
}

function nRandomConstantSum(n, sum){
	var values = [0, sum];

	for(var i=0; i<n-1; i++){
		values.push( Math.random() * sum );
	}

	return values
		.sort((a, b) => {return a-b;})
		.reduce((previousValue, currentValue,i ,a) => {
			if( i < (a.length - 1) ){
				previousValue.push(a[i+1] - currentValue);
			}
		 	return previousValue;
		}, []);
}


export default data;
