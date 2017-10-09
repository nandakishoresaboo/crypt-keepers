import * as React from 'react';
import NewsItem from './NewsItem';
import helpers from '../helpers/api-helpers';

// const propTypes = {
//   activeCoin: PropTypes.string,
// };

interface INewsProps {
  activeCoin: string,
};

interface INewsState {
  curSelection: string,
  trending: Array<any>,
  Bitcoin: Array<any>,
  Litecoin: Array<any>,
  Ethereum: Array<any>,
};

// const defaultProps = {
//   activeCoin: 'Bitcoin',
// };

const parseData = arr => (
  arr.sort((a, b) => {
    const dateA: any = new Date(a.created_at);
    const dateB: any = new Date(b.created_at);
    if (dateA - dateB > 0) {
      return -1;
    }
    if (dateA - dateB < 0) {
      return 1;
    }
    return 0;
  })
);


class News extends React.Component<INewsProps, INewsState> {
  constructor(props: INewsProps) {
    super(props);
    this.state = {
      curSelection: 'trending',
      trending: [],
      Bitcoin: [],
      Litecoin: [],
      Ethereum: [],
    };

    this.setTrendingData = this.setTrendingData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.refreshNews = this.refreshNews.bind(this);

    setInterval(() => {
      this.refreshNews();
    }, (60000 * 3));
  }

  componentDidMount() {
    this.setTrendingData('Bitcoin', true);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCoin !== nextProps.activeCoin) {
      this.setTrendingData(nextProps.activeCoin, false);
    }
  }

  setTrendingData(newCoin, fetchTrending) {
    if (fetchTrending) {
      helpers.getTrendingNews()
        .then((data) => {
          this.setState({ trending: parseData(data.results) });
        })
        .catch(err => (err));
    }
    if (!this.state[newCoin].length) {
      helpers.getCoinData(newCoin)
        .then((data) => {
          this.setState({ [newCoin]: parseData(data.results) });
        })
        .catch(err => (err));
    }

    if (this.state.curSelection !== 'trending') {
      this.setState({ curSelection: newCoin });
    }
  }

  refreshNews() {
    const newsArr = ['trending', 'Bitcoin', 'Litecoin', 'Ethereum'];
    newsArr.forEach((el: any) => {
      if (this.state[el].length) {
        if (el === 'trending') {
          helpers.getTrendingNews()
            .then((data) => {
              this.setState({ trending: parseData(data.results) });
            })
            .catch(err => (err));
        } else {
          helpers.getCoinData(el)
            .then((data) => {
              this.setState({ [el]: parseData(data.results) });
            })
            .catch(err => (err));
        }
      }
    });
  }

  handleClick(isTrending) {
    if (isTrending && !(this.state.curSelection !== 'trending')) {
      this.setState({ curSelection: 'trending' });
    }
    if (!isTrending && this.state.curSelection === 'trending') {
      const newCoin = this.props.activeCoin ? this.props.activeCoin : 'Bitcoin';
      this.setState({ curSelection: newCoin });
    }
  }

  render() {
    const curArr = this.state[this.state.curSelection];
    const trendClass = this.state.curSelection === 'trending' ? 'select' : 'unselect';
    const newsClass = this.state.curSelection === 'trending' ? 'unselect' : 'select';
    return (
      <div className="news-panel">
        <div className="top-button-bar">
          <button className={trendClass} onClick={() => { this.handleClick(true); }} >
            <img src="trending.png" alt="Trending" />
          </button>
          <button className={newsClass} onClick={() => { this.handleClick(false); }} >
            <img src="newspaper.ico" alt="News for Coin" />
          </button>
        </div>
        <div className="news-container">
          {curArr.map(article => (
            <NewsItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
  }
}


export default News;
