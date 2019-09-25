import React, { Component } from "react";
import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import {ROUTE_ADD_PLAYERS, ROUTE_ROOT} from '../../consts/routes';

import Background from '../../asset/Background.png';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import { Typography } from "@material-ui/core";
import {selectors as user} from "../../store/user/user.ducks";
import {connect} from "react-redux";

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

class CreateSuccess extends Component {
  render() {
    return (
      <div style={styles.main}>
        <Typography variant="h4" style={{ fontFamily: 'Montserrat', marginBottom: '7.5vh', textTransform: 'capitalize' }}>
          {`<${this.props.gameSelected.title}>`}
        </Typography>
        <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Montserrat' }}>
          Play with your friends!
        </Typography>
        <br/>
        <ProgressButton variant="contained"
                        loading={false}
                        style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', margin: '1rem', backgroundColor: '#8ECAB1' }}
                        onClick={() => {
                          getStore().dispatch(push(ROUTE_ADD_PLAYERS));
                        }}>
          Create Game
        </ProgressButton>
        <ProgressButton variant="contained"
                        loading={false}
                        style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', backgroundColor: '#8ECAB1' }}
                        onClick={() => {
                          getStore().dispatch(push(ROUTE_ROOT));
                        }}>
          Back to Home Page
        </ProgressButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameSelected: user.gameSelected(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSuccess);
