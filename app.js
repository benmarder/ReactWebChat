import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatRoom from './components/ChatRoom';
import store from './store/store';
import SignIn from './components/SignIn';
import 'normalize.css'; 
import "./stylesheets/main.css";

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userName:""
    }
  this.getUserName = this.getUserName.bind(this);
  }
    //a callback function for children
    getUserName(username){
      console.log("messageFromChild");
      this.setState({userName:username});
    }
    render(){
    const SignInStyle={
      width:"80%",
      margin:"0 auto"
    },
     ChatRoomStyle={
      width:"70%",
      margin:"5vh auto 5vh auto",
      height:"90vh",
      borderRadius:"9px",
      overflow:"hidden"
    }
      if(this.state.userName)
          return (
            <div style={ChatRoomStyle}>
              <ChatRoom userName={this.state.userName}/>;
            </div>);
      return (
        <div style={SignInStyle}>
          <SignIn style={SignInStyle} setUserName={this.getUserName}/>
        </div>);
    }
}

const main = (
  <Provider store={store}>
    <Chat/>
  </Provider>
);

ReactDOM.render(main, document.getElementById('container'));
