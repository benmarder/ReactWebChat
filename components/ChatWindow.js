import React from 'react';
import db from '../database/database';
import Message from './message';
import Input from './Input.js';
export default class ChatWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      messages: {"Lobi":["default"]},
      windowId:props.activeTab,
      createTab:props.createTab
    };
    this.newMessage = this.newMessage.bind(this);
  }

  render() {
    console.log("render was called")
    return (
      <div style={{...this.props.style,...styles.component}}>
        <div id="messages" style={styles.messages}>
          {this.createMessages(this.state.messages[this.state.windowId])}
        </div>
        <div style={styles.input} >
          <Input newMessage={this.newMessage} />
        </div>
      </div>
    );
  }
  componentWillReceiveProps(newProps){
    console.log("props changed: active tab:",newProps.activeTab);
    this.setState(
      {
        ...this.state,
        windowId:newProps.activeTab
      }
    )
  }
  //get the new message that was entered from the input and store in DB.
  newMessage(text) {
    console.log(text);
    let message = {
      "message": text,
      "name": this.state.user.name,
      "timeStamp": Date.now(),
      "color": localStorage.getItem("color"),
      "id": this.state.user.id
    };
    console.log(message);
    let messagesRef;
    if(this.state.windowId === "Lobi") //Lobi
      messagesRef = db.ref("Lobi");
    else{
      messagesRef = db.ref(`users/${this.state.windowId}/messages`);
      let newState = {...this.state};
      newState.messages[this.state.windowId] = newState.messages[this.state.windowId] || [];
      newState.messages[this.state.windowId].push(message);
      this.setState(newState);
    }
  
    messagesRef.push(message);
    event.target.value = "";
  }
  createMessages(messages) {
    console.log("createMessages with: ",messages);
    if(messages !== undefined){
      return messages.map((obj,index) => {
        let isMyMessage=false;
        if (obj === "default") {
          obj = {
            message: `hi ${this.state.user.name}, welcome to the chat!`
          }
        }
        else if(obj.id === this.state.user.id){
          isMyMessage=true;
        }

        return <Message key={index} val={obj} isMyMessage={isMyMessage} />
      });
    }
  }
  setFirebaseListiner(ref,isPrivate){
    const messagesRef =  db.ref(ref);
    let tab = this.state.windowId;
    let initialDataLoaded = false;
    messagesRef.on('child_added', (data) => {
      if (initialDataLoaded) { //work around the first call for all firbase child nodes.
        let newState = {...this.state};
        if(isPrivate)
          tab = data.val().id;
        newState.messages[tab] = newState.messages[tab] || [];
        newState.messages[tab].push(data.val());
        this.setState(newState);
        if(isPrivate && !this.props.hasTab(data.val().id)){
          this.state.createTab({
            name:data.val().name,
            id:data.val().id
          });
        }
      }
    });
    //'value' event fires after 'child_added' ,so we can set the flag.
    messagesRef.once('value', (snapshot) => {
      initialDataLoaded = true;
    });
  
  }
  componentDidMount() {
    console.log("chat window componentDidMount");
    //listen to lobi messages
    this.setFirebaseListiner("Lobi");
    //listen to private messages
    this.setFirebaseListiner(`users/${this.state.user.id}/messages`,true);
    
  }
  componentDidUpdate(prevProps, prevState) {
  
    //auto scroll
    let objDiv = document.querySelector("#messages");
    if (objDiv)
      objDiv.scrollTop = objDiv.scrollHeight;
  }
  createChatId(id1,id2){
    console.log("create id got:" + id1 + "and:" + id2)
    // if its lobi and user conversation, the room id is 1
    if(id1 === 1|| id2 === 1) 
      return 1;
    // if its user and user conversation, the room id is a unique id they both agree on.
    if(id1[0] > id2[0])
      return id1+id2;
    return id2+id1;
  }
}
const styles = {
  component : {
    display:"flex",
    flexDirection:"column",
    backgroundColor: "#f3f3f3",
    height: "100%",
  },
  messages : {
    flex:"auto",
    overflowX: "auto",
    maxHeight:"88vh",
  },
  input : {
    height:"8%",
    width:"95%",
    margin:"2.5%",
  }
}