import React from "react";
import NotFoundImg from '../../asset/404.svg';
import Background from '../../asset/Background.png';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const main = {
  textAlign: 'center',
  backgroundImage: `url(${Background})`,
  /* Full height */
  height: '100vh',
  fontFamily: "Montserrat",
  /* Center and scale the image nicely */
  backgroundSize: 'cover'
};

export default () =>
    <div style={main}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton edge="start" style={{color: "#000"}} aria-label="back" href={"/homepage"}>
            <ArrowBackIosIcon />
            <Typography variant="body1">{'Return to Home'}</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{padding: '20vh 0 0 0'}}>
        <h3>Sorry, page not found!</h3>
        <img src={NotFoundImg} alt="404" style={{ margin: '10vh', maxWidth: '30vh' }} />
      </div>
    </div>;
