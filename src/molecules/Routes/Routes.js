import React from "react";
import { Route, Redirect } from "react-router-dom";
import { renderView } from "./template";


export const AppliedRoute = ({ component: C, ...rest }) =>
  <Route {...rest}
         render={props => renderView(<C {...props} />, rest.title)}
  />;

export const AuthenticatedRoute = ({ component: C, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth
          ? renderView(<C {...props} />, rest.title)
          : <Redirect
            to={`/?redirect=${props.location.pathname}${props.location.search}`}
          />}
    />);
};

// E.g. http://localhost:3000/login?redirect=/semesters/8174e7a0-b6bc-11e9-92af-4feca90288df
function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  // flag i: ignore case
  // 0 ...?redirect=/...2
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  // Find if url has regex expression
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// E.g. signup and login should not be allowed when user is logged in
export const UnauthenticatedRoute = ({ component: C, isAuth, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth
          ? renderView(<C {...props} />, rest.title)
          : <Redirect
            to={redirect === "" || redirect === null ? "/homepage" :
              redirect}
          />}
    />
  );
};



