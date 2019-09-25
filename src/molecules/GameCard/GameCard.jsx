import React, { Component } from "react";
import { push } from 'connected-react-router';
import { getStore } from '../../services/store';
import {ROUTE_ADD_PLAYERS} from '../../consts/routes';
import { connect } from "react-redux";
import { actions as userActions } from '../../store/user/user.ducks';

import { Button } from "@material-ui/core";

const styles = {
  main: {
    // padding: '10vh 0 0 0',
    margin: '1rem',
    background: 'transparent',
    fontFamily: "Montserrat",
    display: 'inline-block'
  },
  button: {
    cursor: 'pointer',
    background: '#FFEEE6',
    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.25)',
    padding: '1rem',
    textTransform: 'none',
    minWidth: '6.5rem',
    minHeight: '6.5rem'
  }
};

class GameCard extends Component {
  render() {
    const { selectGame, set } = this.props;
    const { title, questions } = set;
    return (
      <div style={styles.main}>
        <Button style={styles.button} href={ROUTE_ADD_PLAYERS} onClick={() => selectGame(set)}>
          {title}
          <br />
          {`With ${questions.length} Questions`}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectGame: async (gameSelected) => {
      try {
        dispatch(userActions.success({gameSelected}));
        getStore().dispatch(push(ROUTE_ADD_PLAYERS));
      } catch {
        dispatch(userActions.error());
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameCard);

