import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class PrivateRoutes extends Component {
  render () {
    const { auth, component: Comp, ...rest } = this.props;

    return(
      <Route {...rest} component={(props) => (
        !auth.isEmpty ?
          <Comp {...props} user={auth}/>
          :
          <Redirect to='/sign_in'/>
      )}/>
      );
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, {})(PrivateRoutes);