import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import router from "./router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      { router }
    </Provider>
  </BrowserRouter>
, document.getElementById('root'));

unregister();