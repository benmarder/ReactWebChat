import React from 'react';
import {connect} from 'react-redux'

@connect((store)=>{
  return {
    //will be mapped as props
  };
})
export default class Message extends React.Component {

  constructor() {
    super();
    this.state = {
    
    };
    this.handleNouseIn=this.handleNouseIn.bind(this);
  }
  render() {
    let componentStyle = {
      width:"100%",
      height:"12%",
      margin: "2% 0"
    },
    textContainerStyle = {
      maxWidth:"80%",
      minHeight:"100%",
      display:"inline-block",
      verticalAlign:"top",
      borderRadius:"7px",
      backgroundColor:"#c1c1c1",
    },
    imgStyle = {
      maxHeight: "70%",
      maxWidth: "70%"
    },
    arrowStyle = {
      verticalAlign:"50%",
      maxHeight: "40%",
      maxWidth: "40%"
    },
    pStyle = {
     boxSizing:"border-box",   
     font:"1.2em normal arial ",
     padding:"4%",
     color:"#1c2430",
     verticalAlign:"middle"
    }
      let date = new Date(this.props.val.timeStamp);
      return (
        <div style={componentStyle}>
          <img src="../images/icon2.png" alt="Profile pic" style={imgStyle}/>
          <img src="../images/arrow2.png" alt="arrow" style={arrowStyle}/>
          <div style={textContainerStyle}  onMouseEnter={this.handleNouseIn}>
             <p style={pStyle}>{this.props.val.message}</p> 
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
