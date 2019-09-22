import React, { Component } from "react";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Background from '../../asset/Background.png';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';

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
  // TODO: Add google sign in id
  gameName: yup.string().required('Required'),
  q1: yup.string().required('Required'),
});

export default class CreateQuestionsForm extends Component {
  render() {
    return (
      <>
        <div style={styles.main}>
          <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar>
              <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/"}>
                <ArrowBackIosIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Formik
            initialValues={{
              // TODO: add google sign in id
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
              console.log(values);
              setSubmitting(false)
              // TODO: Handle submit
              // return this.props.handleSubmit({ values, setSubmitting });
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
                  block
                  size="large"
                  disabled={!isValid && isSubmitting}
                  isLoading={isSubmitting}
                  variant="outline-primary"
                  type="submit"
                  text="Create game"
                  loadingText="Loading..."
                  style={{ boxShadow: '2px 4px 3px #E0E0E0', backgroundColor: '#8ECAB1' }}
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
