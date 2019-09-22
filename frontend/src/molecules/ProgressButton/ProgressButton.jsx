import React from 'react';
import PropTypes from 'prop-types';

import green from '@material-ui/core/colors/green';
import { Button, CircularProgress } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D2F2FF',
  },
  wrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: '#D2F2FF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

const ProgressButton = ({
                          loading, children, ...button
                        }) => (
  <div className={styles.wrapper}>
    <Button
      variant="contained"
      color='primary'
      disabled={loading}
      {...button}
      // className={buttonClass}
    >
      {children}
      {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
    </Button>
  </div>
);


ProgressButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ProgressButton.defaultProps = {
  loading: false,
};


export default ProgressButton;
