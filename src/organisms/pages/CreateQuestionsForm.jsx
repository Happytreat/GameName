import React, { Component } from "react";
import * as yup from 'yup';
import _ from 'lodash';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import { ROUTE_CREATE_SUCCESS } from '../../consts/routes';
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
    margin: '0 auto',
    maxWidth: '320px',
    textAlign: 'left'
  },
};

const CreateGameSchema = yup.object().shape({
  gameName: yup.string().required('Required'),
  q1: yup.string().required('Required'),
});

class CreateQuestionsForm extends Component {
  render() {
    return (
      <>
        <div style={styles.main}>
          <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar>
              <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/homepage"}>
                <ArrowBackIosIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Formik
            initialValues={{
              gameName: '',
              q1: '',
              q2: '',
              q3: '',
              q4: '',
              q5: '',
              q6: '',
              q7: '',
              q8: '',
              q9: '',
              q10: ''
            }}
            validationSchema={CreateGameSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              const questions = _.map(_.filter(values, (val, key) => {
                return (key !== 'gameName' && val !== '')
              }), val => {
                return {
                  "question": val
                };
              });

              const data = {
                questions,
                "title": values.gameName,
                "author": this.props.googleTokenId,
              };

              postRequest({
                url: 'api/sets/',
                data,
              }).then(response => {
                this.props.selectGame(data);
                getStore().dispatch(push(ROUTE_CREATE_SUCCESS));
              }).catch(err => console.log(err));
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form style={styles.form}>
                <br />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  Enter a game name:
                </Typography>
                <Field
                  type="text"
                  name="gameName"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  autoFocus
                  variant="outlined"
                />
                <br />
                <br />
                <Typography variant="body2" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  Create 10 questions for your game!
                </Typography>
                <Typography variant="body2" style={{ fontSize: '0.7rem', fontWeight: 500 }}>
                  {"e.g. Trump's favourite local dish is <blank> because he will <blank>."}
                </Typography>
                <br />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q1
                </Typography>
                <Field
                  type="text"
                  name="q1"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q2
                </Typography>
                <Field
                  type="text"
                  name="q2"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q3
                </Typography>
                <Field
                  type="text"
                  name="q3"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q4
                </Typography>
                <Field
                  type="text"
                  name="q4"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q5
                </Typography>
                <Field
                  type="text"
                  name="q5"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q6
                </Typography>
                <Field
                  type="text"
                  name="q6"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q7
                </Typography>
                <Field
                  type="text"
                  name="q7"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q8
                </Typography>
                <Field
                  type="text"
                  name="q8"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q9
                </Typography>
                <Field
                  type="text"
                  name="q9"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Q10
                </Typography>
                <Field
                  type="text"
                  name="q10"
                  margin="dense"
                  component={TextField}
                  fullWidth
                  variant="outlined"
                  style={{ paddingBottom: '1rem'}}
                />
                <ProgressButton
                  size="large"
                  disabled={!isValid && isSubmitting}
                  type="submit"
                  style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', margin: 'auto', position: 'absolute', backgroundColor: '#8ECAB1', textTransform: 'None' }}
                >
                  Create Game
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
    googleTokenId: user.googleTokenId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectGame: async (gameSelected) => {
      try {
        dispatch(userActions.success({gameSelected}));
      } catch {
        dispatch(userActions.error());
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateQuestionsForm);
