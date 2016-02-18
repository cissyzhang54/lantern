import DataAPI from '../utils/DataAPIUtils';
import SectionRealtimeActions from '../actions/SectionRealtimeActions';
import moment from 'moment';

let SectionRealtimeSource = {
  loadSectionRealtimeData: {
    remote(state, query) {
      return DataAPI.getSectionRealtimeData(query);
    },
    local() {
      return null;
    },
    success: SectionRealtimeActions.handleData,
    error: SectionRealtimeActions.loadingFailed,
    loading: SectionRealtimeActions.loadingData,

    shouldFetch(state, query) {
      return this.isStateStale(state, query.section);
    },

    isStateStale(state, section) {
      const timeDiffSinceLastUpdate = moment.utc().diff(moment(state.lastUpdated));
      const isFresh = timeDiffSinceLastUpdate < 60000;
      return (state.section !== section || isFresh === false);
    }
  }
};

export default SectionRealtimeSource;
