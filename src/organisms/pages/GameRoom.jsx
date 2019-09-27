import React, { Component } from "react";
import { connect } from "react-redux";
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

import Background from '../../asset/Background.png';
import Title from "../../asset/GAME_NAME.png";
import ProgressButton from '../../molecules/ProgressButton/ProgressButton';
import {MenuItem, Select, Typography} from "@material-ui/core";
import _ from "lodash";
import {getStore} from "../../services/store";
import {push} from "connected-react-router";
import {ROUTE_ROOT} from "../../consts/routes";

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

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judge: 0,
      questionIter: 0,
      answers: [],
      total: this.props.set.questions.length,
      roundWinner: '',
    }
  }

  render() {
    const {questionIter, total, roundWinner} = this.state;
    const { set: {questions}, points, players, setWinner, resetGame} = this.props;
    return (
      <div style={styles.main}>
        <img src={Title} alt="HomePage" style={{ maxWidth: '45vh', marginBottom: '7.5vh' }} />
        {
          this.state.questionIter < total
            ? (
              <>
                <Typography>{questions[questionIter].question}</Typography>
                <br/>
                <div style={styles.form}>
                  <form style={{minWidth: '20vh', margin: 'auto'}} autoComplete="off">
                    <Typography variant="body1" style={{fontSize: '0.9rem', fontWeight: 700}}>
                      The Winner for this round is:
                    </Typography>
                    <Select
                      value={roundWinner}
                      onChange={(event) => this.setState({roundWinner: event.target.value})}
                      inputProps={{
                        name: 'roundWinner',
                        id: 'roundWinner',
                      }}
                    >
                      {
                        _.map(players, (player) => {
                          return <MenuItem value={player}>{`${player}`}</MenuItem>
                        })
                      }
                    </Select>
                  </form>
                </div>
                <br/>
                <br/>
                <ProgressButton
                  variant="contained"
                  loading={false}
                  onClick={() => {
                    this.setState({
                      questionIter: questionIter + 1,
                    });
                    setWinner(roundWinner, points);
                  }}>
                  Next Question
                </ProgressButton>
              </>
            )
            :
            <>
              <Typography variant="h4">{`Congrats! The Winner is ${_.reduce(_.keys(points), (maxPair, player) => {
                if (points[player] > maxPair[1]) {
                  return [player, points[player]]
                } else {
                  return maxPair
                }
              }, ['', 0])[0]}!!!`}
              </Typography>
              <br/>
              <br/>
              <ProgressButton variant="contained"
                              loading={false}
                              style={{ boxShadow: '2px 4px 3px #E0E0E0', minWidth: '30vh', backgroundColor: '#8ECAB1' }}
                              onClick={() => {
                                resetGame();
                                getStore().dispatch(push(ROUTE_ROOT));
                              }}>
                Back to Home Page
              </ProgressButton>
            </>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    set: user.gameSelected(state),
    players: user.players(state),
    points: user.points(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setWinner: (winner, points) => {
      const p = points
      if (_.find(_.keys(p), winner) > 0) {
        p[winner] += 1;
      } else {
        p[winner] = 1;
      }
      dispatch(userActions.updatePoints(p));
    },
    resetGame: () => {
      dispatch(userActions.resetPlayers());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameRoom);

