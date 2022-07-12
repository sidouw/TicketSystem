import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router/AppRouter'
import { Provider } from 'react-redux';
import store from './Store/store'
import './index.css';




ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);


