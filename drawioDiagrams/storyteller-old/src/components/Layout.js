import React from 'react';
import {connect} from 'react-redux';

export default class Layout extends React.Component{
    render() {
        console.log(this.props);
        console.log(this.state);
        return (<h1>Hello world</h1>);
    }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    startup: () => dispatch(StartupActions.startup())
})

const mapStateToProps = (state) => ({
    ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);