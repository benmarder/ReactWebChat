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
        <div className="message_box">
          <h3>{this.props.val.name}({date.toDateString()};{date.toLocaleTimeString()}): </h3>
          <p>{this.props.val.message} </p> 
        
        </div>
      );
    }
  }
}
