import moment from 'moment';


export default function timestampParser (timespan, baseDate) {
  let [,amount, type] = /(\d+)(\w+)/.exec(timespan)

  return {
    dateFrom : moment(baseDate).subtract(amount, type).toISOString(),
    dateTo : moment(baseDate).toISOString()
  }
}
