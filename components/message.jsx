import React from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase';

export default class Message extends React.Component {

  constructor(props) {
    super(props);
    let state_ = {
        imgSrc:"../images/icon2.png",
        arrowSrc:"../images/arrow2.png",
        componentStyle : { 
          float:"left",  
          width:"90%",
          margin: "0.5% 5%"
        },
        textContainerStyle : {
          maxWidth:"80%",
          minHeight:"5vh",
          font:"1.2em normal arial ",
          display:"table",
          borderRadius:"7px",
          backgroundColor:"#c1c1c1",
          color:"#1c2430",
          padding:"1%",
        },
        profilePicStyle : {
           float:"left",
           verticalAlign:"top",
           height: "7vh"
        },
        arrowStyle : {
          float:"left",
          paddingTop:"1%",
          margin:"-1px",
          maxHeight: "2%",
          maxWidth: "2%"
        },
        pStyle : {
          display: "table-cell",
          verticalAlign: "middle"
        }
      };
     if(props.val.id === firebase.auth().currentUser.uid){     //user messege styles are different 
        state_.imgSrc = "";
        state_.arrowSrc = "../images/arrow2white.png";
        state_.arrowStyle.float = "right";
        state_.componentStyle.float = "right";
        state_.textContainerStyle.float = "right";
        state_.textContainerStyle.backgroundColor = "#ffffff";
      }
    
    this.state=state_;
    this.handleNouseIn=this.handleNouseIn.bind(this);
  }
  render() {
      let date = new Date(this.props.val.timeStamp);
      return (  
        <div style={this.state.componentStyle}>
          <img src={this.state.imgSrc} style={this.state.profilePicStyle}/>
          <img src={this.state.arrowSrc} style={this.state.arrowStyle}/>
          <div style={this.state.textContainerStyle}  onMouseEnter={this.handleNouseIn}>
            <p style={this.state.pStyle}>
               {this.props.val.message} 
            </p>
          </div>
        </div>
      );
    
  }

   /* [{date.toDateString()};{date.toLocaleTimeString()}]
          <h3 style={{color :this.props.val.color}}> ({this.props.val.name}):</h3> */
  handleNouseIn(event){
    let string = this.calcTimePassed(this.props.val.timeStamp);
    event.target.setAttribute("title",string); 
  }
  calcTimePassed(time){
  let mil = Date.now()-time,seconds,minutes,hours,days,weeks,result="";
  seconds = (mil / 1000) | 0;
  mil -= seconds * 1000;

  minutes = (seconds / 60) | 0;
  seconds -= minutes * 60;

  hours = (minutes / 60) | 0;
  minutes -= hours * 60;

  days = (hours / 24) | 0;
  hours -= days * 24;

  weeks = (days / 7) | 0;
  days -= weeks * 7;
  if(weeks)
    result+=weeks+=" weeks";
    else if(days)
      result+=days+=" days";
      else if(minutes)
        result+=minutes+=" minutes";
        else if(seconds)
          result+=seconds+=" seconds";
    result+=" ago"
    console.log("weeks,",weeks,"days",days,"minutes",minutes,"seconds",seconds)
    return result;
  }
}
