import * as React from 'react';

interface INewsItemProps {
  article: {
    url: string,
    title: string,
    published_at: string,
    source: any,
  },
};

// const propTypes = {
//   article: PropTypes.shape({
//     url: PropTypes.string,
//     title: PropTypes.string,
//     published_at: PropTypes.string,
//     source: PropTypes.objectOf(PropTypes.string),
//   }),
// };

// const defaultProps = {
//   article: {
//     url: '',
//     title: '',
//     published_at: '',
//     source: {},
//   },
// };

const NewsItem = (props: INewsItemProps) => (
  <a className="news-item" href={props.article.url} target="_blank">
    <div className="title">
      {props.article.title}
    </div>
    <div className="date">{(new Date(props.article.published_at)).toString()}</div>
    <div className="source">{props.article.source.title}</div>
  </a>
);


export default NewsItem;
