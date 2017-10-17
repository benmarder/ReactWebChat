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
    return (
      <div>
        <div className="chat_view wellcome">
            <main>
                <h1>Welcome</h1>
                <h2>This is the best chat ever built by the finest <br/>engineers from all over the world</h2>
                <form action=""onSubmit={this.handleSubmit}>
                    <input type="text "placeholder="Please enter your user name"required/>
                    <button>Login</button>
                 </form>
            </main>
        </div>
      </div>
    );
  }
}
