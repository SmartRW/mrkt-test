import '@babel/polyfill';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Root from './components/Root';
import reducers from './reducers';
import './scss/styles.scss';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  render(
    <Provider store={store}>
      <Root />
    </Provider>, document.getElementById('app-root'),
  );
};
