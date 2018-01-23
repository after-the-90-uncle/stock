import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './container/App';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from 'selfRedux/reducers';


const reducer = combineReducers(Object.assign({}, reducers, {}))
const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunkMiddleware)
)

// Note: passing enhancer as the last argument requires redux@>=3.1.0
const store = createStore(reducer, enhancer)


const render = Component => {
  ReactDOM.render(
    <AppContainer>
    	<Provider store={store}>
      		<Component store={store} />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  )
}
 
render(App)
 
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./container/App', () => { render(App) })
}
