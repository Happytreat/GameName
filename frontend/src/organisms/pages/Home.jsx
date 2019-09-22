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
    fontFamily: "Montserrat",

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
};

export default class HomePage extends Component {
  render() {
    return (
      <div style={styles.main}>
        <img src={Title} alt="HomePage" style={{ maxWidth: '45vh', marginBottom: '7.5vh' }} />
        <ProgressButton variant="contained"
                        // disabled={isSubmitting}
                        loading={false}
                        onClick={(x) => x}>
          Play as game master
        </ProgressButton>
        <ProgressButton variant="contained"
          // disabled={isSubmitting}
                        loading={false}
                        onClick={(x) => x}>
          Play as guest
        </ProgressButton>
      </div>
    );
  }
}
