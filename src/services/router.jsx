import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// import { selectors as auth } from '../store/auth.ducks';

import {
  AppliedRoute,
  UnauthenticatedRoute,
} from "../molecules/Routes/Routes";

// pages
import NotFoundPage from '../organisms/pages/404';
import HomePage from '../organisms/pages/Home.jsx';
import CreateQuestions from '../organisms/pages/CreateQuestionsForm';

import {
  ROUTE_ROOT,
  ROUTE_CREATE_QUESTIONS,
  ROUTE_GAME_ROOM,
} from '../consts/routes';


const Router = ({ location }) => (
  <Switch>
    <UnauthenticatedRoute path={ROUTE_ROOT} exact component={HomePage} isAuth={false} title={"Home"} />
    <UnauthenticatedRoute path={ROUTE_CREATE_QUESTIONS} exact component={CreateQuestions} isAuth={false} title={"Create Game"} />
    <UnauthenticatedRoute component={NotFoundPage} isAuth={false} title={"404"} />
  </Switch>
);


{/*<div  className="container-fluid">*/}
{/*  <nav  className="navbar navbar-expand-lg navbar-light bg-light">*/}
{/*    <a  className="navbar-brand"  href="#">Django React Demo</a>*/}
{/*    <button  className="navbar-toggler"  type="button"  data-toggle="collapse"  data-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup"  aria-expanded="false"  aria-label="Toggle navigation">*/}
{/*      <span  className="navbar-toggler-icon"></span>*/}
{/*    </button>*/}
{/*    <div  className="collapse navbar-collapse"  id="navbarNavAltMarkup">*/}
{/*      <div  className="navbar-nav">*/}
{/*        <a  className="nav-item nav-link"  href="/">CUSTOMERS</a>*/}
{/*        <a  className="nav-item nav-link"  href="/customer">CREATE CUSTOMER</a>*/}
{/*      </div>*/}
{/*    </div>*/}
{/*  </nav>*/}
{/*  <div  className="content">*/}
{/*    <Route path="/" exact component={CustomersList} />*/}
{/*    <Route path="/customer/:pk"  component={CustomerCreateUpdate} />*/}
{/*    <Route path="/customer/" exact component={CustomerCreateUpdate} />*/}
{/*  </div>*/}
{/*</div>*/}

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
