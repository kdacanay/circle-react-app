import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const PrivateRoute = ({

  // in privateRoute, use Route like app.js, render prop to check if user is not authenticated and not loading, if true, redirect to login. if they are authenticated then component loads

  component: Component,
  auth: { isAuthenticated, loading },
  ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
            <Component {...props} />
          )
      }
    />
  );


PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
