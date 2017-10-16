import React from 'react';
import {connect} from 'react-redux'
import Message from './message.jsx';
import db from '../database/database';
@connect((store)=>{
  return {
    //will be mapped as props
  };
})
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr:["1","2","3","4","5","6","7"]
    };
    this.handleKeydown=this.handleKeydown.bind(this);
  }
  
  handleKeydown(event){
    if(event.key === 'Enter') {
      let messagesRef = db.ref().child("messages"); 
      let message={"string":event.target.value};
      messagesRef.push(message);
      console.log("pusshed")
    }
  }
  createMessages(arr){
        let key=0;
        return arr.map((str)=><Message key={++key} val={str}/>);
  }
    componentWillMount(){
      console.log("componentWillMount")
     
    }
  render() {
    return (
      <div>
        <div id="chat_view">
          {this.createMessages(this.state.arr)}
        </div>
        <input type="text" onKeyDown={this.handleKeydown} />
      </div>
      
    );
  }
  componentDidMount(){
    console.log("componentDidMount");
    const messagesRef=db.ref().child("messages");
    let initialDataLoaded = false; 
    messagesRef.on('child_added', (data)=> {
       this.setState({
         arr:[...this.state.arr,data.val().string]
        });
   
    });
  }
  componentWillReceiveProps(){
     console.log("componentWillReceiveProps")
  }
  componentShouldUptade(){
     console.log("componentShouldUptade")
  }
  componentWillUpdate(){
      console.log("componentWillUpdate")
  }
  componentDidUpdate(){
      console.log("componentDidUpdate!!!!!!!!!!!!!!!");
  }
}
