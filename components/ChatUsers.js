import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import User from "./User";


export default class ChatUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        onlineUsers:[],
        handleClick:this.props.userClickHandler
    };
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
        return usersList.map((user,i)=>{
            let border="1px solid #818181";
            if(i === usersList.length-1) //last user
                border="none";
            return <User key={i} user={user} handleClick={this.state.handleClick} borderBottom={border}/>
        });
    }
  componentDidMount(){
    console.log("componentDidMount");
    let onilneUsersRef =  db.ref().child("onlineUsers");
    onilneUsersRef.on('child_added',snapshot=> {
      //add new user to the view
      this.setState({
        onlineUsers:[
          ...this.state.onlineUsers,
          {
            name:snapshot.val().name,
            id:snapshot.key
          }
        ]
      });
    });
    onilneUsersRef.on("child_removed",snapshot=>{
      //create a new array without the user that disconnected
      this.setState({
        ...this.state,
        onlineUsers : this.state.onlineUsers.filter(user=>user.name!==snapshot.val().name)
      });
    });
  }
  componentDidUpdate(){
 
  }
}
