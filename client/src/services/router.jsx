import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

// import { selectors as auth } from '../store/auth.ducks';

import {
  AppliedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import HomePage from '../organisms/pages/Home.jsx';

import {
  ROUTE_ROOT,
  ROUTE_LOGIN,
  ROUTE_GAME_ROOM,
} from '../consts/routes';


const Router = ({ location }) => (
  <Switch>
    <UnauthenticatedRoute path={ROUTE_ROOT} exact component={HomePage} isAuth={false} title={"Game Name"} />
    { /* Finally, catch all unmatched routes */ }
    <UnauthenticatedRoute component={NotFoundPage} isAuth={false} title={"Game Name"} />
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
