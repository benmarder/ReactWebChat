import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatRoom from './components/ChatRoom.jsx';
import store from './store/store';
import "./stylesheets/main.scss";

const main = (
  <Provider store={store}>
    <ChatRoom />
  </Provider>
);

ReactDOM.render(main, document.getElementById('container'));
