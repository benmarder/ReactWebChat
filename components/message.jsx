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
    return (
      <div className="message_box">
        <h3>{this.props.val}</h3>
      </div>
    );
  }
}
