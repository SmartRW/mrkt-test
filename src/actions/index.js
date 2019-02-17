import { createAction } from 'redux-actions';
import axios from 'axios';

export const postUserCredentialsRequest = createAction('USER_CREDENTIALS_POST_REQUEST');
export const postUserCredentialsSuccess = createAction('USER_CREDENTIALS_POST_SUCCESS');
export const postUserCredentialsFailure = createAction('USER_CREDENTIALS_POST_FAILURE');

export const userLoginRequest = createAction('USER_LOGIN_REQUEST');
export const userLoginSuccess = createAction('USER_LOGIN_SUCCESS');
export const userLoginFailure = createAction('USER_LOGIN_FAILURE');

export const setLoginError = createAction('LOGIN_ERROR_SET');
export const resetLoginError = createAction('LOGIN_ERROR_RESET');

export const userLogin = ({ values }) => async (dispatch) => {
  dispatch(resetLoginError());
  dispatch(postUserCredentialsRequest());
  dispatch(userLoginRequest());
  try {
    const url = 'http://mrkt.little.team/api/public/users/login';
    const credentials = JSON.stringify(values);
    const { data } = await axios.post(url, credentials);
    if (data.error) {
      dispatch(userLoginFailure());
      dispatch(setLoginError('Неправильный логин или пароль'));
    } else {
      dispatch(userLoginSuccess());
    }
    dispatch(postUserCredentialsSuccess());
  } catch (e) {
    dispatch(postUserCredentialsFailure());
    dispatch(setLoginError('Ошибка сети'));
    console.error(e);
  }
};

export const passwordRestoreRequest = createAction('PASSWORD_RESTORE_REQUEST');
export const passwordRestoreSuccess = createAction('PASSWORD_RESTORE_SUCCESS');
export const passwordRestoreFailure = createAction('PASSWORD_RESTORE_FAILURE');

export const restorePassword = ({ login }) => async (dispatch) => {
  dispatch(resetLoginError());
  if (login !== '') {
    dispatch(postUserCredentialsRequest());
    dispatch(passwordRestoreRequest());
    try {
      const url = 'http://mrkt.little.team/api/public/users/reset-password';
      const credentials = JSON.stringify({ login });
      const { data } = await axios.post(url, credentials);
      console.dir(data);
      if (data.error) {
        dispatch(passwordRestoreFailure());
        dispatch(setLoginError('Пользователя с такой почтой или телефоном не существует'));
      } else {
        dispatch(passwordRestoreSuccess());
        dispatch(setLoginError('Ссылка для восстановления пароля отправлена на почту'));
      }
      dispatch(postUserCredentialsSuccess());
    } catch (e) {
      dispatch(postUserCredentialsFailure());
      dispatch(setLoginError('Ошибка сети'));
      console.error(e);
    }
  } else {
    dispatch(setLoginError('Введите эл. почту или телефон'));
  }
};
