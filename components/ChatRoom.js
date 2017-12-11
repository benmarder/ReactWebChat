import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import ChatWindow from "./ChatWindow";
import ChatUsers from "./ChatUsers";
import pickRandomColor from '../scripts/randomRGB'

export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"default",
      arr:["default"]
    };
    localStorage.setItem('color', pickRandomColor());
  }
 render(){
    const componentStyle = {
      height:"inherit",
      boxShadow: "5px 5px 5px #c1c1c1"
    },
    chatWindowStyle = {
      float:"left",
      width:"70%",
      height:"100%"
    },
    chatUsersStyle = {
        float:"left",
        width:"30%",
        height:"100%"
    };
    return (
      <div style={componentStyle}>
        <div style={chatWindowStyle}>
          <ChatWindow userName={this.props.userName} />
        </div>
        <div style={chatUsersStyle}>
          <ChatUsers userName={this.props.userName} />
        </div>
      </div>

    );
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
  
  }
}
