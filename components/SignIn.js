import React from 'react';
import db from '../database/database';
import firebase from 'firebase';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onilneUsersRef: db.ref().child("onlineUsers")
    };
    firebase.auth().signInAnonymously(); 
    //bind functions
    this.validate = this.validate.bind(this);
    this.checkIfUsernameExists = this.checkIfUsernameExists.bind(this);
    this.checkIfUserIdExists = this.checkIfUserIdExists.bind(this); 
  }

  render(){
    const wellcomeStyle={
      margin:"0",
      paddingTop:"3%",
      fontSize:"9.5vw",
      letterSpacing:"0.3em",
      textAlign: "center",
      color:"#FFFFFF",
    },
    introStyle={
      textTransform: "uppercase",
      fontSize:"1.1vw",
      fontWeight:"1",
      textAlign: "center",
      color:"#FFFFFF",
      letterSpacing:"0.2em",
      margin:"0 auto",
      width:"66%"
    },
    formStyle={
      width:"40%",
      margin:"0 auto",
      
    },
    intputStyle={
      width:"100%",
      borderRadius:"9px",
      border: "none",
      outline: "none",
      height:"7vh",
      marginTop:"5vh",
      textAlign: "center",
      boxShadow:"none"
    },
    buttonStyle={
      marginTop:"2vh",
      backgroundColor:"#000000",
      color:"#FFFFFF"
    };

    return (
      <div>
        <div id="landing">
          <h1 style={wellcomeStyle}>WELCOME!</h1>
          <h2 style={introStyle}>This is the best chat ever built by the finest engineers<br/>from all over the world</h2>
          <form style={formStyle} action=""onSubmit={this.validate}>
            <input style={intputStyle} type="text "placeholder="Please enter a nickname (1-6 characters)"required/>
            <input style={Object.assign({},intputStyle,buttonStyle)} type="submit" value="LET'S GO" />
          </form>
        </div>
      </div>
    );
  }
  /*function that checks if the given username already exists in the chat. */
  checkIfUsernameExists(userName){
    return new Promise((resolve,reject)=>{
      this.state.onilneUsersRef.orderByChild("name").equalTo(userName).once("value",snapshot => {
        const userData = snapshot.val();
        if (userData){
          reject(`the username ${userName} already in chat, please enter a different one`);
        }
        else resolve();
      });  
    });
  }
  /*function that checks if the current firebase user (user session) already exists in the chat. */
  checkIfUserIdExists(){
    return new Promise((resolve,reject)=>{
      //fireBase auth
      firebase.auth().onAuthStateChanged((fireBaseUser)=>{
        this.state.onilneUsersRef.once('value', snapshot=>{
          //check if user is already logged in
          if (snapshot.hasChild(fireBaseUser.uid)) {
           reject('you are trying to log in twice from one session. (for testing : try other browser or incognito)');
          }
          else resolve(fireBaseUser);        
        });
      });
    });
  }
  /*function that handles the user input from the username field */
  validate(element){
    element.preventDefault();
    let userName = document.querySelector("input").value,
    usernamePattern = /^\w{1,6}$/;
    if(!(usernamePattern.test(userName))){
        alert("the username you entered is not valid, please enter a name between 1-6 characters with no spaces")
        return;
    }
    this.checkIfUsernameExists(userName)
        .then(this.checkIfUserIdExists)
        .then((fireBaseUser)=>{
          let userOnline = this.state.onilneUsersRef.child(fireBaseUser.uid);
          userOnline.set({name:userName}).then(()=>userOnline.onDisconnect().remove());
          let user = {
            name:userName,
            id:fireBaseUser.uid
          }
            this.props.setUser(user);
        })
        .catch((error)=>alert(error));  
  }

}
