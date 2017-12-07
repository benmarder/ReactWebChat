import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import Message from './message';
import Input from './Input.js';
export default class ChatWindow extends React.Component {

  constructor(props) {
    super(props);
   this.state = {
      id:"default",
      arr:["default"]
    };
    this.newMessage = this.newMessage.bind(this);
  }

  render(){ 
      const componentStyle={
        position:"relative",
        backgroundColor:"#f3f3f3",
        height:"100%",
      }
      const messagesStyle={
        height:"87%",
        overflowX:"auto"
      }
    return (
      <div style={componentStyle}>
        <div id = "messages" style={messagesStyle}>
          {this.createMessages(this.state.arr)}
        </div>
        <Input newMessage={this.newMessage}/>
      </div>
    );
  }
  
  //get the new message that was entered from the input and store in DB.
  newMessage(text){
    console.log(text);
      let messagesRef = db.ref().child("messages"); 
      let message={
        "message":text,
        "name":this.props.userName,
        "timeStamp": Date.now(),
        "color":localStorage.getItem("color"),
        "id":firebase.auth().currentUser.uid
      };
      console.log(message);
      messagesRef.push(message);
      event.target.value="";
    }
  createMessages(arr){
        let key=0;
        return arr.map((obj)=>{
          if(obj==="default"){
            obj = {
              message: `hi ${this.props.userName}, welcome to the chat!`
            }
          }
           return <Message key={++key} val={obj}/>
        });
    }
  componentDidMount(){
    console.log("componentDidMount");
    const messagesRef=db.ref().child("messages");
    let initialDataLoaded = false; 
    messagesRef.on('child_added', (data)=> {
      if(initialDataLoaded){ //work around the first call for all firbase child nodes.
        this.setState({
          id:data.userId,
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

  componentDidUpdate(){
    //auto scroll
      let objDiv = document.querySelector("#messages");
      if(objDiv)
        objDiv.scrollTop = objDiv.scrollHeight;
  }
}
