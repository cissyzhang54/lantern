import DataAPI from '../utils/DataAPIUtils';
import GlobalActions from '../actions/GlobalActions';
import moment from 'moment';
import assign from 'object-assign';

const UPDATE_INTERVAL = 5; // minutes

let GlobalSource = {
  loadIndexStatus: {

    remote(state) {
      return DataAPI.getStatus()
        .then((response) => {
          return assign(state, { latestIndex: {
            data: response,
            lastUpdated: moment().valueOf()
          }});
        });
    },

    local(state) {
      let date = moment(state.latestIndex.lastUpdated);
      if (moment() < date.add(UPDATE_INTERVAL, 'minutes')) {
        return state;
      }

      return null; // trigger remote fetch
    },

    success: GlobalActions.updateLatestIndex,
    error: GlobalActions.loadingFailed
  }
}

export default GlobalSource;
