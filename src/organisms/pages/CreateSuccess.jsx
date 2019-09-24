import React, { Component } from "react";
import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import {ROUTE_GAME_ROOM, ROUTE_ROOT} from '../../consts/routes';

import Background from '../../asset/Background.png';
import Title from "../../asset/GAME_NAME.png";
import Rectangle from '../../asset/Rectangle.png';
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import { Typography, IconButton } from "@material-ui/core";
import IconCopy from '@material-ui/icons/Link';
import copy from 'copy-to-clipboard';

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

export default class CreateSuccess extends Component {
  render() {
    return (
      <div style={styles.main}>
        <Typography variant="h4" style={{ fontFamily: 'Montserrat', marginBottom: '7.5vh' }}>
          {"<Your Game Name>"}
        </Typography>
        <Typography variant="body1" style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Montserrat' }}>
          Share your game with your friends!
        </Typography>
        <br/>
        <Typography variant="body1" style={{ fontSize: '0.9rem', fontFamily: 'Montserrat'}}>
          Get shareable link here:
          <IconButton
            aria-label="copy"
            color="primary"
            size="small"
            onClick={() => copy('INVITE CODE')}
          >
            <IconCopy style={{ fontSize: '20px' }} />
          </IconButton>
        </Typography>
        <ProgressButton variant="contained"
                        loading={false}
                        style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', margin: '1rem', backgroundColor: '#8ECAB1' }}
                        onClick={() => {
                          getStore().dispatch(push(ROUTE_GAME_ROOM));
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