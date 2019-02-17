import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const postUserCredentialsStatus = handleActions({
  [actions.postUserCredentialsRequest]: () => 'requested',
  [actions.postUserCredentialsSuccess]: () => 'succeeded',
  [actions.postUserCredentialsFailure]: () => 'failed',
}, '');

const userLoggedIn = handleActions({
  [actions.userLoginRequest]: () => 'requested',
  [actions.userLoginSuccess]: () => 'succeded',
  [actions.userLoginFailure]: () => 'failed',
}, '');

const loginError = handleActions({
  [actions.setLoginError]: (state, { payload }) => payload,
  [actions.resetLoginError]: () => false,
}, false);

const passwordResetStatus = handleActions({
  [actions.passwordRestoreRequest]: () => 'requested',
  [actions.passwordRestoreSuccess]: () => 'succeeded',
  [actions.passwordRestoreFailure]: () => 'failed',
}, '');

export default combineReducers({
  postUserCredentialsStatus,
  passwordResetStatus,
  userLoggedIn,
  loginError,
  form: formReducer,
});
