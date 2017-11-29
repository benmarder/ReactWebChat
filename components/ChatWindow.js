import React from 'react';
//import Message from './message.jsx';
import db from '../database/database';
import firebase from 'firebase';
import Message from './message.jsx';
import Input from './Input.js';


// import ChatView from "./ChatView";
// import ChatInput from "./ChatInput";

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
        overflow:"hidden"
      }
    return (
      <div style={componentStyle}>
         {this.createMessages(this.state.arr)}
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
        "id":this.state.id
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
    // //fireBase auth
    //  firebase.auth().onAuthStateChanged((fireBaseUser)=>{
    //   let state_=Object.assign({},this.state);
    //   state_.id=fireBaseUser.uid
    //   this.setState(state_);
    // });
  }

  // componentDidUpdate(){
  //   //auto scroll
  //     let objDiv = document.querySelector(".chat_view > section");
  //     if(objDiv)
  //       objDiv.scrollTop = objDiv.scrollHeight;
  // }
}
