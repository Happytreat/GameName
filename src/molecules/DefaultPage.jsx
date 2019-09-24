import React from 'react';
import Background from "../asset/Background.png";


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

export const DefaultPage = (view) => {
  return (
    <div style={styles.main}>
      {children}
    </div>
  );
};
