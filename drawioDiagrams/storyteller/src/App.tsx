// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as React from 'react';
// import './App.css';
// import { View } from './lib/framework/view/View';
// import { IApp } from './lib/ide/appData/IApp';
// import { IViewData } from './lib/framework/view/IViewData';
// import Theme from './lib/ide/view/Theme';
// import { IdeView } from './lib/ide/view/IdeView';

// export class App extends View<IApp> {

//   render() {

//     console.log('props are: ', this.props);

//     if (this.props.data) {
//       return this.renderCustom(this.props); 
//     }
    
//     return (
//       <div className="App">
//         <IdeView data={'someData'} />
//         Application is loading now...
//       </div>
//     );
//   }
// }

// function mapStateToProps(state: any): IViewData<IApp> {
//   console.log('state is binded to the App!. State: ', state);
  
//   return {
//     data: state,
//     theme: Theme
//   }
// }

// export default connect(mapStateToProps)(App);