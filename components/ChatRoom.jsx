import React from 'react';
import {connect} from 'react-redux'
import Message from './message.jsx';
import db from '../database/database';
import firebase from 'firebase';
import ChatWindow from "./ChatWindow";
import ChatUsers from "./ChatUsers";


export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"default",
      arr:["default"]
    };
    firebase.auth().signInAnonymously();
    localStorage.setItem('color', this.pickRandomColor());
  }
 render(){
    const ChatWindowStyle = {
      float:"left",
      width:"70%",
      height:"100%"
    },
    ChatUsersStyle = {
        float:"left",
        width:"30%",
        height:"100%"
    };
    return (
      <div style={{height:"inherit"}}>
        <div style={ChatWindowStyle}>
          <ChatWindow userName={this.props.userName} />
        </div>
        <div style={ChatUsersStyle}>
          <ChatUsers />
        </div>
      </div>

    );
  }
pickRandomColor(){
  return "rgb("+
        (Math.floor(Math.random() * 256))+
        ", "+
        (Math.floor(Math.random() * 256))+
          ", "+
        (Math.floor(Math.random() * 256))+
        ")";
}
 
 
  componentDidMount(){
    console.log("componentDidMount");
    document.getElementById("background").className = "blur";
    const messagesRef=db.ref().child("messages");
    let initialDataLoaded = false; 
    messagesRef.on('child_added', (data)=> {
      if(initialDataLoaded){ //work around the first call for all firbase child nodes.
        this.setState({
          color:this.state.color,
          arr:[...this.state.arr,data.val()]
          });
      }
      else{
          //here we ignore the useless calls 
      }
    });
    //'value' event fires after 'child_added' ,so we can set the flag.
    messagesRef.once('value',(snapshot)=>{
        initialDataLoaded=true;
    });
    //fireBase auth
     firebase.auth().onAuthStateChanged((fireBaseUser)=>{
      let state_=Object.assign({},this.state);
      state_.id=fireBaseUser.uid
      this.setState(state_);
    });
  }

  
}
