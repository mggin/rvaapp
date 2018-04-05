/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './app/containers/main'
import allReds from './redux/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(allReds)

export default class App extends Component<Props> {
  
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

