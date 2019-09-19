import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// import { selectors as auth } from '../store/auth.ducks';

import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
// import {
//   ROUTE_ROOT,
//   ROUTE_DASHBOARD,
//   ROUTE_USER_LOGIN,
//   ROUTE_USER_SIGNUP,
//   ROUTE_CONFIRM_EMAIL,
// } from '../consts/routes';


const Router = ({ isAuth, location }) => (
  <Switch>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFoundPage} />
  </Switch>
);

Router.propTypes = {
  // isAuth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    // isAuth: auth.isAuth(state),
    // Required for connected-router to work
    // https://github.com/supasate/connected-react-router/issues/130
    location: state.router.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Router);
