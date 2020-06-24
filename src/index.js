import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "./app/store/configureStore";
import {Provider} from "react-redux";
import ScrollToTop from "./app/common/util/ScrollToTop";
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();

const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App/>
      </BrowserRouter>
    </Provider>, rootElement);
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  })
}

store.firebaseAuthIsReady.then(() => {
  render();
});

serviceWorker.unregister();
