import DataAPI from '../utils/DataAPIUtils';
import SectionActions from '../actions/SectionActions';

let SectionSource = {
  loadSectionData: {
    remote(state, query) {
      return DataAPI.getSectionData(query);
    },
    local() {
      return null;
    },
    success: SectionActions.updateData,
    error: SectionActions.loadingFailed,
    loading: SectionActions.loadingData,

    shouldFetch(query) {
      return true;
    }
  }
};

export default SectionSource;
