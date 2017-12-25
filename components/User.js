import React from 'react';

export default class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        border:"none",
        handleClick:this.props.handleClick,
        user:this.props.user
    };
    this.handleClick=this.handleClick.bind(this);
  }
 
  render(){
      const componentStyle={
        display:"block",
        backgroundColor:"#1c2430",
        height:"8%",
        padding:"2% 0",
        cursor: "pointer",
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
        minHeight:"15px"
      },  
      textStyle = {
        fontSize:"1em",
        display:"inline-block",
        margin:"0 auto"
      },
      profifePicStyle = {
        height:"5vh",
        minHeight:"15px"
      }
    return (
      <li onClick={this.handleClick} style={componentStyle}>
         <div style={nameStyle}>
             <img src="/images/online.png" style={onlineStyle}/>
             <p style={textStyle}>
              {this.state.user.name}
             </p>
             <img src="/images/icon2.png" style={profifePicStyle}/>
         </div>
      </li>
    );
  }

  handleClick(event){
    this.state.handleClick(this.state.user,true)
}
componentWillMount(){
     
}
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentDidUpdate(){
 
  }
}
