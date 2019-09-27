import React, { Component } from "react";
import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import {ROUTE_CREATE_QUESTIONS, ROUTE_ROOT} from '../../consts/routes';
import { connect } from "react-redux";
import {actions as userActions, selectors as user} from '../../store/user/user.ducks';

import Background from '../../asset/Background.png';
import Title from "../../asset/GAME_NAME.png";
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import GameLibrary from '../../molecules/GameLibrary/GameLibrary';
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {GoogleLogout} from "react-google-login";

const styles = {
  main: {
    padding: '0 0 0 0',
    textAlign: 'center',
    backgroundImage: `url(${Background})`,
    /* Full height */
    height: '100vh',
    fontFamily: "Montserrat",

    /* Center and scale the image nicely */
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
};

class CreatorHome extends Component {
  render() {
    return (
      <div style={styles.main}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/"}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton edge="end" aria-label="signout" href={"/"} onClick={() => this.props.signOut()}>
              {
                this.props.isAuth
                  ? <GoogleLogout
                    clientId="772369058063-665vio82g46oqmvijs344qtf1u5aiec5.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => {
                        this.props.signOut();
                        getStore().dispatch(push(ROUTE_ROOT));
                      }
                    }
                  >
                  </GoogleLogout>
                  : null
              }
            </IconButton>
          </Toolbar>
        </AppBar>
        <img src={Title} alt="HomePage" style={{ marginTop: '20vh', maxWidth: '45vh', marginBottom: '7.5vh' }} />
        {
          // only logged in can you create new Game pack
          this.props.isAuth
            ?  <ProgressButton variant="contained"
                               loading={false}
                               onClick={() => getStore().dispatch(push(ROUTE_CREATE_QUESTIONS))}>
              Create new game
            </ProgressButton>
            : null
        }
        <hr />
        <GameLibrary />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: user.isAuth(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: async () => {
      dispatch(userActions.signout());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatorHome);

