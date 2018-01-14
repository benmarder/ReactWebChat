import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import User from "./User";


export default class ChatUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeUser:props.activeUser,
        onlineUsers:[],
        startPrivateChat:props.startPrivateChat,
        showPhotoUpload:props.showPhotoUpload
    };
    this.setUser = this.setUser.bind(this);
  }

  render(){
      const componentStyle={
        backgroundColor:"#1c2430",
        height:"100%"
      }
    return (
      <ul style={{...this.props.style,...componentStyle}}>
        {this.createUsers(this.state.onlineUsers)}
      </ul>
    );
  }

  /*function that fill's the users window with users*/
  createUsers(usersList){
    let isActiveUser;
    return usersList.map((user,i)=>{
      if(this.state.activeUser.id === user.id)
        isActiveUser = true;
      else
        isActiveUser = false;
      let border="1px solid #818181";
      if(i === usersList.length-1) //last user
        border="none";
      return ( 
        <User 
          key={i} 
          user={user} 
          startPrivateChat={this.state.startPrivateChat} 
          borderBottom={border}
          isActiveUser={isActiveUser}
          showPhotoUpload={this.state.showPhotoUpload}/>)
    });
  }
  componentDidMount(){
    console.log("componentDidMount");
    let onilneUsersRef =  db.ref().child("onlineUsers");
    onilneUsersRef.on('child_added',this.setUser);
    onilneUsersRef.on('child_changed',this.setUser);
    onilneUsersRef.on("child_removed",snapshot=>{
      //create a new array without the user that disconnected
      this.setState({
        ...this.state,
        onlineUsers : this.state.onlineUsers.filter(user=>user.name!==snapshot.val().name)
      });
    });
  }
  setUser(snapshot){
    const firebaseUser = snapshot.val();
    let isNew = true;
    const onlineUsers =  this.state.onlineUsers.map((user)=>{
      if(user.id === snapshot.key){
        isNew=false;
        return {
          ...user,
          image: firebaseUser.image
        }
      }
      return user;
    });
    if(isNew){
      onlineUsers.push({
        name:firebaseUser.name,
        id:snapshot.key,
        image:firebaseUser.image
      });
    }
    //add new user to the view
    this.setState({
      ...this.state,
      onlineUsers:onlineUsers
    });
  }
}
