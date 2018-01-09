import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatRoom from './components/ChatRoom';
import store from './store/store';
import SignIn from './components/SignIn';
import 'normalize.css';
import "./stylesheets/main.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{name:"default",id:0}
    }
    this.setUser = this.setUser.bind(this);
  }
  
  setUser(user) {
    this.setState(
      {user: user });
  }
  render() {
    const SignInStyle = {
      width: "80%",
      margin: "0 auto"
    },
      ChatRoomStyle = {
        width: "70%",
        margin: "5vh auto 5vh auto",
        height: "90vh",
        overflow: "hidden"
      }
    if (this.state.user.id !== 0)
      return (
        <div style={ChatRoomStyle}>
          <ChatRoom user={this.state.user} />;
        </div>
      );
    else return (
      <div style={SignInStyle}>
        <SignIn style={SignInStyle} setUser={this.setUser} />
      </div>
      );
  }
}

const main = (
  <Provider store={store}>
    <Chat />
  </Provider>
);

ReactDOM.render(main, document.getElementById('container'));
