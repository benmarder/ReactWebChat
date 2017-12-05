import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleKeydown=this.handleKeydown.bind(this);
    }

    render(){
        const componentStyle={
            height:"8%",
            borderRadius:"9px",
            border:"1px solid #9d9d9d",
            outline: "none",
            width:"95%",
            margin:"2.5%",
            padding:"2%",
            boxSizing:"border-box",
            position:"absolute",
            bottom:"0"
        }

        return (
            <input type="text" style={componentStyle} onKeyDown={this.handleKeydown}placeholder="write a new message"/>
        );
    }

    handleKeydown(event){
        if(event.key === 'Enter') {
            this.props.newMessage(event.target.value);
            event.target.value="";
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        console.log("componentDidMount");
    }
    componentDidUpdate(){
    
    }
}
