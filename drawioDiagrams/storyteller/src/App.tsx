import { connect } from 'react-redux';
import * as React  from 'react';
import './App.css';
import { View } from './lib/framework/view/View';
import { IApp } from './lib/ide/appData/IApp';
import { IViewData } from './lib/framework/view/IViewData';

export class App extends View<IApp> {

  render() {

    if (this.props.data) {
      return this.renderCustom(this.props, this.props.template); 
    }
    
    return (
      <div className="App">
        Application is loading now...
      </div>
    );
  }
}

const mapStateToProps = (state: IViewData<IApp>) => ({...state});
export default connect(mapStateToProps)(App);