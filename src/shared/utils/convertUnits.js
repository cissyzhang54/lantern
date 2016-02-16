
function getPercentageDifference (compared , comparator) {
  return ((Math.abs(compared-comparator)/ comparator) * 100) | 0;
}

function checkSignClass (x) {
  return (x < 0) ? 'down' : 'up';
}


let convert = {
  secondsToMinutes: (seconds) => {
    seconds = Math.abs(seconds)
    let metricMinutes = Math.floor(seconds / 60);
    let metricSeconds = Math.floor(seconds - metricMinutes * 60);
    return {minutes: metricMinutes, seconds: metricSeconds};
  },
  percentageDifference: (metric, comparatorMetric) => {
    if (!comparatorMetric) return [null, null]
    let comparatorDifference = getPercentageDifference(metric, comparatorMetric);
    let differenceSign = checkSignClass(metric - comparatorMetric);
    return [differenceSign, comparatorDifference + '%'];
  },
  time: (metric, comparatorMetric)=> {
    let convertedMetric = convert.secondsToMinutes(metric);
    let transformMetric = convertedMetric.minutes + 'm ' + convertedMetric.seconds + 's';
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  },
  integer:  (metric, comparatorMetric)=>{
    let transformMetric = (metric || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add commas to output
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  },
  percentage:  (metric, comparatorMetric)=>{
    let transformMetric = (metric || 0) +"%";
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  }
}

export default convert;
