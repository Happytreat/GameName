import { createAction, handleActions } from 'redux-actions';

export const types = {
  request: 'user/REQUEST',
  success: 'user/SUCCESS',
  error: 'user/ERROR',
};

export const actions = {
  request: createAction(types.request),
  success: createAction(types.success), // For saga
  error: createAction(types.error),
};

const initialState = {
  fetching: false,
  error: false,
  nickname: '',
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
};

export default reducer;
