import React, { Component } from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

import { postRequest } from "../../services/request";
import GameCard from '../GameCard/GameCard';
import { Typography } from "@material-ui/core";

const styles = {
  main: {
    background: 'transparent',
    textAlign: 'center',
    fontFamily: "Montserrat",
  },
};

class GameLibrary extends Component {
  async componentDidMount() {
    // update sets (in store)
    const { loadSets, isAuth, googleTokenId, sets } = this.props;
    await loadSets({ sets, isAuth, googleTokenId })
  }

  renderSets = () => {
    const { sets } = this.props;
    return (
      _.map(sets, set => {
        return <GameCard key={set.pk} set={set} />
      })
    )
  };

  render() {
    return (
      <div style={styles.main}>
        <Typography variant="body1" gutterBottom style={{ fontFamily:'Montserrat', fontSize: '0.9rem', fontWeight: 700 }}>Game Library</Typography>
        <br />
        {
          this.renderSets()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: user.isAuth(state),
    googleTokenId: user.googleTokenId(state),
    sets: user.sets(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSets: async ({ sets, isAuth, googleTokenId }) => {
      if (isAuth && googleTokenId) {
        postRequest({
          url: 'api/secure_sets/',
          data: {
            "author": googleTokenId,
          }
        }).then(response => {
          const fetch = response.data;
          // console.log("Author's Questions", fetch);
          const updatedAuthor = _.unionWith(sets, fetch, (x, y) => {
            return x.pk === y.pk
          });
          // console.log("Updated Set after author", updatedAuthor);
          dispatch(userActions.loadSets(updatedAuthor));
        }).catch(err =>
          console.log('The author set fetching is failing.', err)
        );
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameLibrary);

