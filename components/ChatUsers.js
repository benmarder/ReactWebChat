import React from 'react';
//import Message from './message.jsx';
import db from '../database/database';
import firebase from 'firebase';
import User from "./User";


export default class ChatUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        onlineUsers:[]
    };
  }

  render(){
      const componentStyle={
        backgroundColor:"#1c2430",
        height:"100%"
      }
    return (
      <div style={componentStyle}>
        {this.createUsers(this.state.onlineUsers)}
      </div>
    );
  }

  
  createUsers(usersList){
        return usersList.map((obj,i)=>{
            console.log(obj);
            let border="1px solid #818181";
            if(i === usersList.length-1) //last user
                border="none";
            return <User key={i} name={obj.userName} borderBottom={border}/>
        });
    }
  componentDidMount(){
    console.log("componentDidMount");
    let set=new Set();
    db.ref('/onlineUsers').once('value').then(snapshot=> {
        snapshot.forEach(function(item) {
           set.add({id:item.key,userName:item.val()});
        });
         this.setState({onlineUsers:Array.from(set)});
    });
   
    
  //   var amOnline = new Firebase("https://lets-chat-43e37.firebaseio.com/.info/connected");
  //   var userRef = new Firebase("https://lets-chat-43e37.firebaseio.com/presence/" + userid);
  //   amOnline.on('value', function(snapshot) {
  //     if (snapshot.val()) {
  //       userRef.onDisconnect().remove();
  //       userRef.set(true);
  //     }
  //   });
   }
  componentDidUpdate(){
 
  }
}
