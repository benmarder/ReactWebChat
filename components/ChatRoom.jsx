import React from 'react';
import {connect} from 'react-redux'
import Message from './message.jsx';
import db from '../database/database';
import firebase from 'firebase';
@connect((store)=>{
  return {
    //will be mapped as props
  };
})
export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr:["default"],
      name:"defName"
    };
    this.handleKeydown=this.handleKeydown.bind(this);
  }

  //get the new message that was entered from the input and store in DB.
  //that will fire the 'child_added' event listener
  handleKeydown(event){
    if(event.key === 'Enter') {
      let messagesRef = db.ref().child("messages"); 
      let message={
        "message":event.target.value,
        "name":this.state.name,
        "timeStamp": Date.now()
      };
      console.log(message);
      messagesRef.push(message);
      console.log("pusshed")
    }
  }
  createMessages(arr){
        let key=0;
        return arr.map((obj)=>{
          if(obj==="default"){ //the wellcome message
            return <Message key={0} val={null}/>
          }
          else{               //regular message
           return <Message key={++key} val={obj}/>
          }
        });
    }

  componentWillMount(){
    console.log("componentWillMount")
    
  }

  render(){
    return (
      <div>
        <div id="chat_view">
          {this.createMessages(this.state.arr)}
        </div>
        <input type="text" onKeyDown={this.handleKeydown} />
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
          arr:[...this.state.arr,data.val()]
          });
      }
      else{
          //here we ignore the useless calls
      }
    });
    messagesRef.once('value',(snapshot)=>{//'value' event fires after 'child_added' ,so we can set the flag.
      initialDataLoaded=true; 
    });
  }

  componentWillReceiveProps(){
     console.log("componentWillReceiveProps")
  }
  componentShouldUptade(){
     console.log("componentShouldUptade")
  }
  componentWillUpdate(){
      console.log("componentWillUpdate")
  }
  componentDidUpdate(){
      console.log("componentDidUpdate!!!!!!!!!!!!!!!");
      // //TODO scroll down
      // let objDiv = document.getElementById("chat_view");
      // console.log("componentDidUpdate!!!!!!!!!!!!!!!!",objDiv);
      // objDiv.scrollTop = objDiv.scrollHeight;
  }
}
