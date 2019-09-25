import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import { selectors as user } from '../store/user/user.ducks';

import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import HomePage from '../organisms/pages/Home.jsx';
import CreateQuestions from '../organisms/pages/CreateQuestionsForm';
import CreateSuccess from '../organisms/pages/CreateSuccess';
import NicknameForm from "../organisms/pages/NicknameForm";
import CreatorHome from "../organisms/pages/CreatorHome";

import {
  ROUTE_ROOT,
  ROUTE_CREATE_QUESTIONS,
  ROUTE_GAME_ROOM,
  ROUTE_CREATE_SUCCESS,
  ROUTE_CREATOR_HOME,
} from '../consts/routes';


const Router = ({ isAuth, location }) => (
  <Switch>
    <UnauthenticatedRoute path={ROUTE_ROOT} exact component={HomePage} isAuth={false} title={"Home"} />
    <UnauthenticatedRoute path={ROUTE_CREATE_SUCCESS} exact component={CreateSuccess} isAuth={false} title={"Success"} />
    <UnauthenticatedRoute path={ROUTE_CREATOR_HOME} exact component={CreatorHome} isAuth={false} title={"Select Game"} />
    <AuthenticatedRoute path={ROUTE_CREATE_QUESTIONS} exact component={CreateQuestions} isAuth={isAuth} title={"Create Game"} />
    <UnauthenticatedRoute path={ROUTE_GAME_ROOM} exact component={NicknameForm} isAuth={false} title={"Set Nickname"} />
    <UnauthenticatedRoute component={NotFoundPage} isAuth={false} title={"Page Not Found"} />
  </Switch>
);

Router.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuth: user.isAuth(state),
    // Required for connected-router to work
    // https://github.com/supasate/connected-react-router/issues/130
    location: state.router.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Router);
