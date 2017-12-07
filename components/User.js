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
        display:"block",
        backgroundColor:"#1c2430",
        height:"8%",
        padding:"2% 0",
        borderBottom:this.props.borderBottom
      },
      nameStyle={
        display:"flex",
        alignItems:"center",
        width:"80%",
        height:"100%",
        margin:"auto",
        lineHeight: "100%",
        color:"#FFFFFF",
      },
      onlineStyle = {
        alignItems:"middle",
        maxWidth:"20%",
        maxHeight:"50%",
      },  
      textStyle = {
        fontSize:"1em",
        display:"inline-block",
        margin:"0 auto"
      },
      profifePicStyle = {
        height:"5vh"
      }
    return (
      <li style={componentStyle}>
         <div style={nameStyle}>
             <img src="/images/online.png" style={onlineStyle}/>
             <p style={textStyle}>
              {this.props.name}
             </p>
             <img src="/images/icon2.png" style={profifePicStyle}/>
         </div>
      </li>
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
