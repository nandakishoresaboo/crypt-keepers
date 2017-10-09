import * as React from 'react';
import Overview from './Overview';
import MyFinances from './MyFinances';

interface IPanelProps {
  handleClick: (coin: string) => void,
  username: string
};

interface IPanelState {
  view: string
};

class Panel extends React.Component<IPanelProps, IPanelState> {
  constructor(props: IPanelProps) {
    super(props);

    this.state = {
      view: 'overview',
    };
  }

  changePanel(view) {
    this.setState({
      view,
    });
  }

  render() {
    const overviewClass = this.state.view === 'overview' ? 'panel-show' : 'panel-hide';
    const myFinancesClass = this.state.view === 'overview' ? 'panel-hide' : 'panel-show';
    const overviewButton = this.state.view === 'overview' ? 'select' : 'unselect';
    const financeButton = this.state.view === 'overview' ? 'unselect' : 'select';
    return (
      <div className="panel-container">
        <div className="panel-nav">
          <button className={overviewButton} onClick={() => this.changePanel('overview')}>
            Coin Overview
          </button>
          <button className={financeButton} onClick={() => this.changePanel('finances')}>
            My Finances
          </button>
        </div>
        <div className="main">
          <Overview className={overviewClass} handleClick={this.props.handleClick} />
          <MyFinances
            className={myFinancesClass}
            username={this.props.username}
            handleClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}


export default Panel;
