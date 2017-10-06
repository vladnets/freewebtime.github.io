// import { connect } from 'react-redux';
import * as React  from 'react';
import './App.css';
// import { IAppState } from './lib/ide/state/IAppState';

export class App<TData> extends React.Component<TData> { 
//React.Component<{data: any}> {

  render() {

    // const { IdeState } = this.props;

    // if (IdeState){
    //   return (
    //     <div className="App">
    //       <GraphEditorIde data={IdeState} />
    //     </div>
    //   );
    // }

    return (
      <div className="App">
        Application is loading now...
      </div>
    );
  }
}

// const mapStateToProps = (state: IAppState) => ({...state});
// export default connect(mapStateToProps)(App);