import React, { Component } from "react";
import Background from '../../asset/Background.png';
import Title from "../../asset/GAME_NAME.png";
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';

const styles = {
  main: {
    padding: '20vh 0 0 0',
    textAlign: 'center',
    backgroundImage: `url(${Background})`,
    /* Full height */
    height: '100vh',

    /* Center and scale the image nicely */
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  // p: {
  //   paddingTop: '1.5rem',
  //   color: '#999',
  //   fontFamily: "Montserrat",
  //   size: '14px',
  //   fontWeight: '600',
  // },
  button: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: '12px',
    fontWeight: '600',
    border: '#D2F2FF',
    textTransform: 'None',
    backgroundColor: '#D2F2FF',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
    padding: '0.5rem 0.8rem',
    margin: '0.5rem',
  }
};

export default class HomePage extends Component {
  render() {
    return (
      <div style={styles.main}>
        <img src={Title} alt="HomePage" style={{ maxWidth: '45vh', marginBottom: '7.5vh' }} />
        <ProgressButton variant="contained"
                        // disabled={isSubmitting}
                        loading={false}
                        style={styles.button}
                        onClick={(x) => x}>
          Play as game master
        </ProgressButton>
        <ProgressButton variant="contained"
          // disabled={isSubmitting}
                        loading={false}
                        style={styles.button}
                        onClick={(x) => x}>
          Play as guest
        </ProgressButton>
      </div>
    );
  }
}
