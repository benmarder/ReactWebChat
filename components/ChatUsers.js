import React from 'react';
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

  /*function that fill's the users window with users*/
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
      //add new user to the view
      this.setState({
        onlineUsers:[...this.state.onlineUsers,snapshot.val()]
      });
    });
    onilneUsersRef.on("child_removed",snapshot=>{
      //create a new array without the user that disconnected
      this.setState({
        onlineUsers : this.state.onlineUsers.filter(name=>name!==snapshot.val())
      });
    });
  }
  componentDidUpdate(){
 
  }
}
