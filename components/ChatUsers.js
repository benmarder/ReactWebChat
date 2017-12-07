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
      <ul style={componentStyle}>
        {this.createUsers(this.state.onlineUsers)}
      </ul>
    );
  }

  
  createUsers(usersList){
        return usersList.map((name,i)=>{
            let border="1px solid #818181";
            if(i === usersList.length-1) //last user
                border="none";
            return <User key={i} name={name} borderBottom={border}/>
        });
    }
  componentDidMount(){
    console.log("componentDidMount");
    let onilneUsersRef =  db.ref().child("onlineUsers");
    onilneUsersRef.on('child_added',snapshot=> {
      this.setState({
        onlineUsers:[...this.state.onlineUsers,snapshot.val()]
      });
    });
    onilneUsersRef.on("child_removed",snapshot=>{
      //TODO ! allow only unique usernames
      //
      this.setState({
        onlineUsers : this.state.onlineUsers.filter(name=>name!==snapshot.val())
      });
    });
    //fireBase auth
    firebase.auth().onAuthStateChanged((fireBaseUser)=>{
      let userOnline = onilneUsersRef.child(fireBaseUser.uid);
      userOnline.set(this.props.userName)
                .then(()=>userOnline.onDisconnect().remove())
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
