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
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    this.handleSubmit = this.handleSubmit.bind(this);   
}
    handleSubmit(element){
        element.preventDefault();
        let userName = document.querySelector("input").value;
        if(/^ +$/.test(userName)){ // no name is not valid
            alert("common dude.. space is not a name!!")
        }
        else
            this.props.callParent(userName);
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
    },
    buttonStyle={
      marginTop:"2vh",
      backgroundColor:"#000000",
      color:"#FFFFFF"
    };

    return (
      <div>
        <div id="landing" >
                <h1 style={wellcomeStyle}>WELCOME!</h1>
                <h2 style={introStyle}>This is the best chat ever built by the finest engineers<br/>from all over the world</h2>
                <form style={formStyle} action=""onSubmit={this.handleSubmit}>
                    <input style={intputStyle} type="text "placeholder="Please enter a nickname"required/>
                    <input style={Object.assign({},intputStyle,buttonStyle)} type="submit" value="LET'S GO" />
                 </form>
        </div>
      </div>
    );
  }
}
