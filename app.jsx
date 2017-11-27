import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ChatRoom from './components/ChatRoom.jsx';
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
  this.messageFromChild = this.messageFromChild.bind(this);
  }
    //a callback function for children
    messageFromChild(username){
      console.log("messageFromChild");
      console.log(this.state);
      this.setState({userName:username});
    }
    render(){
      if(this.state.userName)
          return <ChatRoom userName={this.state.userName}/>;
      return <SignIn callParent={this.messageFromChild}/>
    }
}

const main = (
  <Provider store={store}>
     <Chat/>
  </Provider>
);

ReactDOM.render(main, document.getElementById('container'));
