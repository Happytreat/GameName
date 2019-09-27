import React, { Component } from "react";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './services/router';
import { history, persistor, getStore } from './services/store';
import "./App.css";

class App extends Component {
  render() {
    // TODO: Get name and version from env
    console.log('Game Name client: v29');

    return (
      <div className="App container">
        <Provider store={getStore()}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <Router />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

// export default App;
export default App;
