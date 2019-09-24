import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';

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
};

// Store the id (to send to backend) in Auth user
const responseGoogle = (response) => {
  console.log(response);
};

export default class HomePage extends Component {
  render() {
    return (
      <div style={styles.main}>
        <img src={Title} alt="HomePage" style={{ maxWidth: '45vh', marginBottom: '7.5vh' }} />
        <GoogleLogin
          clientId="772369058063-665vio82g46oqmvijs344qtf1u5aiec5.apps.googleusercontent.com"
          render={renderProps => (
            <ProgressButton variant="contained"
                            loading={false}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
              Play as game master
            </ProgressButton>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
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
