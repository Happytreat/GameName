import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'user/REQUEST',
  success: 'user/SUCCESS',
  error: 'user/ERROR',
  signout: 'user/SIGNOUT',
  loadSets: 'user/LOAD',
  resetPlayers: 'user/RESETPLAYERS',
  addPlayers: 'user/ADDPLAYERS',
  updatePoints: 'user/UPDATE'
  // clear gameSelected and sets when senter creator's home
  // clearSets: 'user/CLEAR'
};

export const actions = {
  request: createAction(types.request),
  success: createAction(types.success), // For saga
  error: createAction(types.error),
  signout: createAction(types.signout),
  loadSets: createAction(types.loadSets),
  resetPlayers: createAction(types.resetPlayers),
  addPlayers: createAction(types.addPlayers),
  updatePoints: createAction(types.updatePoints)
};

const initialState = {
  fetching: false,
  error: false,
  nickname: '',
  googleTokenId: '',
  isAuth: false,
  gameSelected: '',
  sets: [],
  players: [],
  points: {}
};

const reducer = handleActions({
  [types.request]: (state) => (
    {
      ...state,
      fetching: true,
      error: false,
    }),
  [types.success]: (state, action) => (
    {
      ...state,
      fetching: false,
      ...action.payload,
    }),
  [types.loadSets]: (state, action) => (
    {
      ...state,
      fetching: false,
      sets: action.payload,
    }),
  [types.resetPlayers]: (state) => (
    {
      ...state,
      fetching: false,
      players: [],
      points: {}
    }),
  [types.addPlayers]: (state, action) => (
    {
      ...state,
      fetching: false,
      players: action.payload,
    }),
  [types.updatePoints]: (state, action) => (
    {
      ...state,
      fetching: false,
      points: action.payload,
    }),
  [types.signout]: () => (
    {
      fetching: false,
      isAuth: false,
      ...initialState,
    }),
  [types.error]: (state) => (
    {
      ...state,
      fetching: false,
      error: true,
    }),
}, initialState);

export const selectors = {
  error: state => state.user.error,
  fetching: state => state.user.fetching,
  nickname: state => state.user.nickname,
  isAuth: state => state.user.isAuth,
  googleTokenId: state => state.user.googleTokenId,
  gameSelected: state => state.user.gameSelected,
  sets: state => state.user.sets,
  points: state => state.user.points,
  players: state => state.user.players
};

export default reducer;
