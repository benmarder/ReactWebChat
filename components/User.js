import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
export default class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        border:"none"
    };
  }

  render(){
      const componentStyle={
        backgroundColor:"#1c2430",
        height:"10%",
        borderBottom:this.props.borderBottom
      }
    const nameStyle={
        width:"35%",
        height:"50%",
        margin:"auto",
        padding:"2.5vh 0",
        lineHeight: "100%",
        textAlign:"center",
        fontSize:"1em",
        color:"#FFFFFF"
      }
    return (
      <div style={componentStyle}>
         <div style={nameStyle}>
             <img src="/images/online.png" width="1em" height="1em"/>
            {this.props.name}
         </div>
      </div>
    );
  }
componentWillMount(){
     
}
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentDidUpdate(){
 
  }
}
