import { connect } from 'react-redux';
import * as React  from 'react';
import './App.css';
import IAppState from './lib/tutorial/IAppState'
import NavigationBar from './Application/components/NavigationBar';

class App extends React.Component<IAppState> {

  onMenuItemClick(e: any) {
    console.log(e);
  }

  render() {

    const { Project } = this.props;

    var header = (
      <div className="App-header">
        <NavigationBar 
          headerText="This is header!"
          headerUrl="#"
          items={[]}
          onClick={(e: any) => this.onMenuItemClick(e)}
        />
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