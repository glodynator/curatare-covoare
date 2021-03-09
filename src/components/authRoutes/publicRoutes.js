import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class PublicRoutes extends Component {
  render () {
    const { auth, component: Comp, isRedirect, ...rest } = this.props;

    return <Route {...rest} component={(props) => (
      rest.restricted ?
        (
          !auth.isEmpty ?
            <Redirect to='/articles'/>
            :
            <Comp {...props} user={auth}/>
        )
        :
        (
          isRedirect ?
            <Redirect to='/'/>
            :
            <Comp {...props} user={auth} />
        )
    )}/>;
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps, {})(PublicRoutes);