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
    if(this.props.val === null){ //initial chat message
      return (
      <div className="message_box">
         <h2>hi {this.props.userName}, wellcome to chat!</h2>
      </div>
      );
    }
    else{ //regular chat message
      let date = new Date(this.props.val.timeStamp);
      return (
        <div className="message_box" onMouseEnter={this.handleNouseIn}>
          <h3 style={{color :this.props.val.color}}>{this.props.val.name}({date.toDateString()};{date.toLocaleTimeString()}): </h3>
          <p>{this.props.val.message} </p> 
        </div>
      );
    }
  }

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
