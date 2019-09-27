import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import {ROUTE_CREATOR_HOME} from '../../consts/routes';
import { connect } from "react-redux";
import { actions as userActions } from '../../store/user/user.ducks';

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

class HomePage extends Component {
  render() {
    return (
      <div style={styles.main}>
        <img src={Title} alt="HomePage" style={{ maxWidth: '45vh', marginBottom: '7.5vh' }} />
        <GoogleLogin
          clientId="772369058063-665vio82g46oqmvijs344qtf1u5aiec5.apps.googleusercontent.com"
          render={renderProps => (
            <ProgressButton variant="contained"
                            loading={false}
                            onClick={() => {
                              renderProps.onClick();
                              // // TODO: Remove in prod. For dev
                              // getStore().dispatch(push(ROUTE_CREATOR_HOME));
                              // this.props.signIn({
                              //   tokenId: "123445-token",
                              //   profileObj: {
                              //     givenName: 'Melodies'
                              //   }
                              // });
                            }}
                            disabled={renderProps.disabled}>
              Play
            </ProgressButton>
          )}
          buttonText="Login"
          onSuccess={(res) => {
            responseGoogle(res);
            console.log("Successful!" + res.tokenId);
            // Store User Id
            this.props.signIn(res);
            // Redirect to Creator's Home Page to select/create game
            getStore().dispatch(push(ROUTE_CREATOR_HOME));
          }}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: async (googleResponse) => {
      try {
        dispatch(userActions.success({
          googleTokenId: googleResponse.tokenId,
          nickname: googleResponse.profileObj.givenName,
          isAuth: true
        }));
      } catch {
        dispatch(userActions.error());
      }
    },
    guestMode: () => {
      dispatch(userActions.signout());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

