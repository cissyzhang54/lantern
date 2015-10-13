export default class formatData {

  constructor(DATA, COMPATATORDATA) {
    this.DATA = DATA
    this.COMPATATORDATA = COMPATATORDATA
    this.id = 'category'
  }

  mapTypes(dataItem, tLabel, fLabel){
    let label = dataItem[0];
    if (tLabel && fLabel){
      label = label == "T" ? tLabel : fLabel;
    }
    return {
      [this.id]: label.replace(/\d+\./g,'').trim(),
      [this.metricLabel]: dataItem[1],
    };
  }

  merge(data, comparatorData, comparatorLabel){
    let metricID = this.id;
    let metricLabel = this.metricLabel;
    let merged = data.map((d) => {
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
        [metricLabel]: 0
      });
    })
    return merged
  }

  getMetric(metricName, metricLabel, tLabel, fLabel){
    let self = this
    this.metricLabel = metricLabel
    let metricData = this.DATA[metricName].map(d => self.mapTypes(d, tLabel, fLabel))
    let keys = [metricLabel]
    if (this.COMPATATORDATA && this.COMPATATORDATA[metricName]){
      let comparatorLabel = `'${this.COMPATATORDATA.comparator}' Average ${metricLabel}`;
      let comparatorData = this.COMPATATORDATA[metricName].map(d => self.mapTypes(d, tLabel, fLabel))
      metricData = this.merge(metricData, comparatorData, comparatorLabel)
      keys.push(comparatorLabel)
    }
    return [metricData, this.id, keys]
  }
}
