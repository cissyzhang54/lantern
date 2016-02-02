export default class formatData {

  constructor(DATA, COMPARATORDATA) {
    this.DATA = DATA
    this.COMPARATORDATA = COMPARATORDATA
    this.id = 'category'
  }

  mapTypes(dataItem, tLabel, fLabel){
    let label = dataItem[0];
    if (tLabel && fLabel){
      label = label == "T" ? tLabel : fLabel;
    }
    if (typeof label !== 'number') {
      label = label.replace(/\d+\./g,'').trim()
    }
    return {
      [this.id]: label,
      [this.metricLabel]: dataItem[1]
    };
  }

  merge(data, comparatorData, comparatorLabel){
    let metricID = this.id;
    let metricLabel = this.metricLabel;

    let merged = data.map((d) => {
      d[comparatorLabel] = null;
      return d
    })
    .map((d) => {
      let i=0
      while (comparatorData.length && i < comparatorData.length) {
        var cData = comparatorData[i]
        if (cData[metricID] === d[metricID]) {
          d[comparatorLabel] = cData[metricLabel]
          comparatorData.splice(i, 1);
          break
        } else {
          i++
        }
      }
      return d;
    });
    comparatorData.forEach(function(cData) {
      merged.push({
        [comparatorLabel] : cData[metricLabel],
        [metricID]: cData[metricID],
        [metricLabel]: null
      });
    })
    return merged
  }

  getMetric(metricName, metricLabel, tLabel, fLabel){
    this.metricLabel = metricLabel
    let metricData = this.DATA[metricName].map(d => this.mapTypes(d, tLabel, fLabel))
    let keys = [metricLabel]
    if (this.COMPARATORDATA && this.COMPARATORDATA[metricName]){
      let comparatorLabel = `'${this.COMPARATORDATA.comparator}' Average ${metricLabel}`;
      let comparatorData = this.COMPARATORDATA[metricName].map(d => this.mapTypes(d, tLabel, fLabel))
      metricData = this.merge(metricData, comparatorData, comparatorLabel)
      keys.push(comparatorLabel)
    }
    return [metricData, this.id, keys]
  }

  // this has no arguments cos pete was showing off and then left all those
  // unused variables on the args, but we're just passing ...arguments to
  // getMetric so we dont need to define any arguments, just be aware they are
  // actually there :)
  getPCTMetric() {
    let [data, , keys] = this.getMetric(...arguments);
    let sums = {};
    let d, k;
    for (let i = 0; i < data.length; i++) {
      d = data[i];
      for (let j = 0; j < keys.length; j++) {
        k = keys[j];
        if (!sums.hasOwnProperty(k) || isNaN(sums[k])) { sums[k] = 0; }
        if (!d.hasOwnProperty(k) || isNaN(d[k])) { d[k] = 0; }
        sums[k] += d[k]
      }
    }

    for (let i = 0; i < data.length; i ++) {
      d = data[i];
      for (let j = 0; j < keys.length; j++) {
        k = keys[j];
        d[k + ' %'] = ((d[k] / sums[k]) * 100).toFixed(1);
      }
    }

    return [data, this.id, keys];
  }
}
