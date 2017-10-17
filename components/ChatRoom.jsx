import React from 'react';
import {connect} from 'react-redux'
import Message from './message.jsx';
import db from '../database/database';
import firebase from 'firebase';
@connect((store)=>{
  return {
    //will be mapped as props in redux
  };
})
export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"default",
      arr:["default"]
    };
    firebase.auth().signInAnonymously();
   
    localStorage.setItem('color', this.pickRandomColor());
    this.handleKeydown=this.handleKeydown.bind(this);
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
  //get the new message that was entered from the input and store in DB.
  //that will fire the 'child_added' event listener
  handleKeydown(event){
    if(event.key === 'Enter') {
      let messagesRef = db.ref().child("messages"); 
      let message={
        "message":event.target.value,
        "name":this.props.userName,
        "timeStamp": Date.now(),
        "color":localStorage.getItem("color"),
        "id":this.state.id
      };
      console.log(message);
      messagesRef.push(message);
      event.target.value="";
    }
  }
  createMessages(arr){
        let key=0;
        return arr.map((obj)=>{
          if(obj==="default"){ //the wellcome message
            return <Message userName={this.props.userName} key={0} val={null}/>
          }
          else{               //regular message
           return <Message key={++key} val={obj}/>
          }
        });
    }

  render(){
    return (
      <div>
        <div className="chat_view">
          <section>
            {this.createMessages(this.state.arr)}
          </section>
          <input type="text" onKeyDown={this.handleKeydown}placeholder="write a new message" />
        </div>
      </div>
      
    );
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
    //fireBase auth
     firebase.auth().onAuthStateChanged((fireBaseUser)=>{
      let state_=Object.assign({},this.state);
      state_.id=fireBaseUser.uid
      this.setState(state_);
    });
  }

  componentDidUpdate(){
    //auto scroll
      let objDiv = document.querySelector(".chat_view > section");
      objDiv.scrollTop = objDiv.scrollHeight;
  }
}
