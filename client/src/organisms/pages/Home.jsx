import React, { Component } from "react";
import Background from '../../asset/background.jpg';
import NotFoundImg from "../../asset/404.svg";

const styles = {
  main: {
    paddingTop: '10rem',
    textAlign: 'center',
    backgroundImage: `url(${Background})`
  },
  p: {
    color: '#999',
  },
  h1: {
    fontFamily: "Open Sans sans-serif",
    fontWeight: '600',
  },
};

export default class NotLoggedIn extends Component {
  render() {
    return (
      <div style={styles.main}>
        <h1 style={styles.h1}>Game Name</h1>
        <p style={styles.p}>A trivia party app</p>
        <br />
        <img src={NotFoundImg} alt="HomePage" style={{ maxWidth: '60vh', padding: '0 1rem 0 0' }} />
      </div>
    );
  }
}
