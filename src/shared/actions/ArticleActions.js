import alt from '../alt';

class ArticleActions {
    constructor() {
        this.generateActions(
            'addFilter',
            'removeFilter',
            'selectComparator',
            'selectDateRange',
            'requestData',
            'receiveData',
            'receiveDataFailed',
            'destroy'
        )
    }
}

export default alt.createActions(ArticleActions);
