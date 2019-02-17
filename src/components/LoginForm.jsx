import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import connect from '../helpers/connect';

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

const validate = (values) => {
  const errors = {};

  if (!values.login) {
    errors.login = 'Введите эл. почту или телефон';
  }

  if (!values.password) {
    errors.password = 'Введите пароль';
  }

  return errors;
};

const mapStateToProps = ({
  loginError,
}) => ({
  loginError,
});

const mapFormValuesToProps = (state) => {
  const selector = formValueSelector('loginForm');
  const login = selector(state, 'login');
  return { login };
};

@connect(mapStateToProps)
@connect(mapFormValuesToProps)
@reduxForm({ form: 'loginForm', validate })
class LoginForm extends React.Component {
  onSubmit = async (values) => {
    const { userLogin } = this.props;
    await userLogin({ values });
  };

  onRestorePasswordClick = async () => {
    const { login, restorePassword } = this.props;
    await restorePassword({ login });
  };

  renderInput = ({ input, id, type }) => {
    const { submitting } = this.props;
    return (
      <input
        {...input}
        id={id}
        type={type}
        disabled={submitting}
        className="login-form__input"
      />
    );
  }

  render = () => {
    const {
      handleSubmit,
      invalid,
      submitting,
      loginError,
    } = this.props;

    return (
      <form
        className="login-form"
        onSubmit={handleSubmit(this.onSubmit)}
      >

        <div className="login-form__fieldset">
          <h2 className="login-form__header">
            Вход
          </h2>

          <label className="login-form__label" htmlFor="login">
            Эл. почта или телефон
            <Field
              id="login"
              name="login"
              type="text"
              component={this.renderInput}
            />
          </label>

          <label className="login-form__label" htmlFor="password">
            Пароль
            <Field
              id="password"
              name="password"
              type="password"
              component={this.renderInput}
            />
            <button
              type="button"
              className="login-form__restore-password"
              onClick={this.onRestorePasswordClick}
              disabled={submitting}
            >
            Напомнить
            </button>
          </label>
        </div>
        <button
          className="login-form__submit"
          type="submit"
          disabled={submitting || invalid}
        >
          Войти на площадку
        </button>
        {loginError && (
          <span className="login-form__error-message">
            {loginError}
          </span>
        )}
      </form>
    );
  }
}

export default LoginForm;
