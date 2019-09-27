import React, { Component } from "react";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { GoogleLogout } from 'react-google-login';
import _ from 'lodash';
import {
  Typography, AppBar, Toolbar, IconButton, Select, MenuItem
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { push } from 'connected-react-router';
import { getStore } from '../../services/store';


import Background from '../../asset/Background.png';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import {actions as userActions, selectors as user} from "../../store/user/user.ducks";
import { connect } from "react-redux";
import {ROUTE_GAME_ROOM} from "../../consts/routes";

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

class EnterPlayersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 1,
    };
  }

  async componentDidMount() {
    await this.props.resetPlayers();
  }

  renderForm() {
    const initialValues = {};
    const SchemaShape = {};
    const k = [];
    for (let i = 0; i < this.state.numOfPlayers; i++) {
      initialValues[i] = '';
      SchemaShape[i] = yup.string().required('Required');
      k.push(i);
    }


    const PlayersSchema = yup.object().shape(SchemaShape);

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={PlayersSchema}
          onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(false);
            this.props.addPlayers(_.values(values));
            getStore().dispatch(push(ROUTE_GAME_ROOM));
          }}
        >
          {({isSubmitting, isValid}) => (
            <Form>
              {
                _.map(k, player => {
                  return (
                    <div key={`playerform-${player}`}>
                      <br/>
                      <Typography variant="body1" style={{fontSize: '0.9rem', fontWeight: 700}}>
                        {`Player ${player+1}: `}
                      </Typography>
                      <Field
                        type="text"
                        name={player.toString()}
                        margin="dense"
                        component={TextField}
                        fullWidth
                        autoFocus
                        variant="outlined"
                        style={{minWidth: '30vh'}}
                      />
                    </div>)
                })
              }
              <ProgressButton
                size="large"
                disabled={!isValid && isSubmitting}
                type="submit"
                style={{
                  boxShadow: '2px 4px 3px #E0E0E0',
                  minWidth: '30vh',
                  margin: 'auto',
                  position: 'absolute',
                  backgroundColor: '#8ECAB1',
                  textTransform: 'None'
                }}
              >
                Join Game
              </ProgressButton>
            </Form>
          )}
        </Formik>
      </>
    )
  }


  // TODO: Remove <IconButton edge="end" aria-label="signout" href={"/"} onClick={() => this.props.signOut()}> in prod
  render() {
    return (
      <>
        <div style={styles.main}>
          <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar>
              <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/"}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton edge="end" aria-label="signout" href={"/"}>
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
          <div style={styles.form}>
            <form style={{ minWidth: '20vh', margin: 'auto' }} autoComplete="off">
                <Typography variant="body1" style={{fontSize: '0.9rem', fontWeight: 700}}>
                  Number of Players
                </Typography>
                <Select
                  value={this.state.numOfPlayers}
                  onChange={(event) => this.setState({numOfPlayers: event.target.value})}
                  inputProps={{
                    name: 'numOfPlayers',
                    id: 'numOfPlayers',
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
            </form>
            {
              this.renderForm()
            }
          </div>
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
    addPlayers: async (players) => {
      try {
        dispatch(userActions.addPlayers(players));
      } catch {
        dispatch(userActions.error());
      }
    },
    resetPlayers: async () => {
      dispatch(userActions.resetPlayers());
    },
    signOut: async () => {
      dispatch(userActions.signout());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterPlayersForm);
