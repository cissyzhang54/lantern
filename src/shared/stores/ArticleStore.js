import alt from '../alt';
import assign from 'object-assign';
import _ from 'underscore';

import ArticleActions from '../actions/ArticleActions';
import DataAPI from '../utils/DataAPIUtils';

let query = {
    uuid: null,
    dateFrom: null,
    dateTo: null,
    comparator: null,
    filters: []
};

class ArticleStore {

    constructor() {
        this.bindActions(ArticleActions);
        this.data = null;
        this.errorMessage = null;
    }

    update(param, updates) {
        if(query[param] && updates){
            query[param] = assign(query[param], updates)
        }
    }

    receiveData(newData) {
        this.data = newData;
        this.errorMessage = null;
    }

    receiveDataFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
    requestData(id) {
        query.uuid = id;
        DataAPI.getArticleData(query)
            .then(function(data) {
                ArticleActions.receiveData(data);
            })
    }

    addFilter(filter) {
        this.update('filters', _.union(query.filters, [filter]));
    }
    removeFilter(filter) {
        this.update('filters', _.without(query.filters, [filter]));
    }
    selectComparator(comparator) {
        this.update('comparator', comparator);
    }
    destroy() {
        alt.recycle(this);
    }

}

export default alt.createStore(ArticleStore, 'ArticleStore');