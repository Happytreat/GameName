import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'user/REQUEST',
  success: 'user/SUCCESS',
  error: 'user/ERROR',
  signout: 'user/SIGNOUT',
};

export const actions = {
  request: createAction(types.request),
  success: createAction(types.success), // For saga
  error: createAction(types.error),
  signout: createAction(types.signout)
};

const initialState = {
  fetching: false,
  error: false,
  nickname: '',
  googleTokenId: '',
  isAuth: false,
  gameSelected: ''
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
  [types.signout]: () => (
    {
      fetching: false,
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
  gameSelected: state => state.user.gameSelected
};

export default reducer;
