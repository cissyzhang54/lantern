import React from 'react/addons';
import connectToStores from 'alt/utils/connectToStores';
import ArticleRealtimeStore from '../stores/ArticleRealtimeStore';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import ArticleActions from '../actions/ArticleActions';
import ArticleQueryActions from '../actions/ArticleQueryActions';
import ComparatorActions from '../actions/ComparatorActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import LineChart from '../components/LineChart';
import ChunkWrapper from '../components/ChunkWrapper';
import LiveIndicator from '../components/LiveIndicator';
import Header from '../components/Header';
import * as formatAuthors from '../utils/formatAuthors';
import moment from 'moment';
import Link from 'react-router/lib/Link';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class ArticleRealtimeView extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [ArticleRealtimeStore]
  }

  static getPropsFromStores() {
    return ArticleRealtimeStore.getState();
  }

  componentDidMount() {
    const uuid = this.props.params.uuid;
    const isSameArticle = uuid === this.props.uuid;
    // get the last timestamp to see if the data is old
    const lastUpdated = this.props.data.length ? this.props.data.slice(-1)[0][0] : null;
    const timeDiffSinceLastUpdate = moment.utc().diff(moment(lastUpdated));
    const isFresh = timeDiffSinceLastUpdate < 60000;
    if (!isSameArticle || !isFresh) {
      ArticleRealtimeStore.loadArticleRealtimeData({uuid : uuid});
    }
    ArticleRealtimeActions.connect();
    ArticleRealtimeActions.subscribeToArticle(uuid);
  }

  componentWillUnmount() {
    ArticleRealtimeActions.disconnect();
  }

  handleHistoricalClick() {
    ArticleActions.listenToQuery();
    ArticleQueryActions.clickedOnArticle({
      uuid: this.props.uuid,
      publishDate: this.props.published
    })
    ComparatorActions.listenToQuery();
    ComparatorQueryActions.clickedOnArticle({
      uuid: this.props.uuid,
      publishDate: this.props.published
    })
  }

  render() {
    let data = this.props.data.map(function(d) {
      return {
        date: d[0],
        views: d[1]
      }
    })
    return (
      <div>
        <ChunkWrapper component="link">
          <Link
            to={'/articles/' + this.props.uuid}
            onClick={this.handleHistoricalClick.bind(this)}
            >
            Historical view
          </Link>
        </ChunkWrapper>
        <ChunkWrapper component="header">
          <Header
            title={this.props.title}
            linkURL={'http://www.ft.com/cms/s/0/' + this.props.uuid + '.html'}
            author={'By: ' + formatAuthors.join(this.props.author)}
            published={'First Published: ' + this.props.published_human}
            uuid={this.props.uuid}
          />
        </ChunkWrapper>
        <ChunkWrapper component="realtime-views">
          <h3>Real time views</h3>
          <LiveIndicator isLive={this.props.isLive} />
          <LineChart
            data={data}
            keys={['views']}
            category={'date'}
            yLabel='Page Views'
            xLabel='Time'
            cols={12}
            />
        </ChunkWrapper>
      </div>
    );

  }

}

export default connectToStores(ArticleRealtimeView);
