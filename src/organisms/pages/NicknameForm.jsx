import React, { Component } from "react";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { GoogleLogout } from 'react-google-login';
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import { postRequest } from '../../services/request';


import Background from '../../asset/Background.png';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import {actions as userActions, selectors as user} from "../../store/user/user.ducks";
import { connect } from "react-redux";

const styles = {
  main: {
    backgroundImage: `url(${Background})`,
    /* Full height */
    height: '100%',
    fontFamily: "Montserrat",

    /* Center and scale the image nicely */
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  form: {
    margin: '30vh auto 70vh auto',
    maxWidth: '320px',
    textAlign: 'left'
  },
};

const NicknameSchema = yup.object().shape({
  nickname: yup.string().required('Required'),
});

class NicknameForm extends Component {
  render() {
    return (
      <>
        <div style={styles.main}>
          <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar>
              <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/"}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton edge="end" aria-label="back" href={"/"} onClick={() => this.props.signOut()}>
              {
                this.props.isAuth
                ? <GoogleLogout
                    clientId="772369058063-665vio82g46oqmvijs344qtf1u5aiec5.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => this.props.signOut()}
                  >
                  </GoogleLogout>
                : null
              }
              </IconButton>
            </Toolbar>
          </AppBar>
          <Formik
            initialValues={{
              nickname: this.props.nickname
            }}
            validationSchema={NicknameSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              this.props.setNickname(values.nickname);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form style={styles.form}>
                <br />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  Enter a nickname:
                </Typography>
                <Field
                  type="text"
                  name="nickname"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  autoFocus
                  variant="outlined"
                  style={{ minWidth: '30vh' }}
                />
                <ProgressButton
                  block
                  size="large"
                  disabled={!isValid && isSubmitting}
                  isLoading={isSubmitting}
                  variant="outline-primary"
                  type="submit"
                  style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', margin: 'auto', position: 'absolute', backgroundColor: '#8ECAB1', textTransform: 'None' }}
                >
                  Join Game
                </ProgressButton>
              </Form>
            )}
          </Formik>
        </div>
      </>
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
    setNickname: async (nickname) => {
      try {
        dispatch(userActions.success({nickname}));
      } catch {
        dispatch(userActions.error());
      }
    },
    signOut: async () => {
      dispatch(userActions.signout());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NicknameForm);
