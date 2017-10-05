import { connect } from 'react-redux';
import * as React  from 'react';
import './App.css';
import IAppState from './lib/tutorial/IAppState'

const logo = require('./logo.svg');

class App extends React.Component<IAppState> {
  render() {

    const { Project } = this.props;

    var header = (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome!</h2>
      </div>
    )

    let bodyContent: any;
    if (Project) {
      bodyContent = (
        <span>
          <div>Project: {Project.Name}, created {Project.Created}</div>
        </span>
      )
    } else {
      bodyContent = (
        <span>
          <div>No project loaded</div>
        </span>
      )
    }

    return (
        <div className="App">
          {header}
          {bodyContent}
        </div>
      );
  }
}

const mapStateToProps = (state: IAppState) => ({...state});
export default connect(mapStateToProps)(App);