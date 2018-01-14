import React from 'react';

export default class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        border:"none",
        startPrivateChat:props.startPrivateChat,
        showPhotoUpload:props.showPhotoUpload,
        user:props.user,
        isActiveUser:props.isActiveUser
    };
    this.handleClick=this.handleClick.bind(this);
  }
 
  render(){
      const componentStyle={
        display:"block",
        padding:"1px",
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
        maxHeight:"100%",
        maxWidth:"10%",
        borderRadius:"50%"
      }
      let click;
      if(this.state.isActiveUser) //if the user is the active user, his click is ti change photo 
        click = this.state.showPhotoUpload;
      else
        click = handleClick;
      return (
      <li onClick={click} style={componentStyle}>
         <div style={nameStyle}>
             <img src="/images/online.png" style={onlineStyle}/>
             <p style={textStyle}>
              {this.state.user.name}
             </p>
             <img src={this.props.user.image || "/images/icon2.png"} style={profifePicStyle}/>
         </div>
      </li>
    );
  }

  handleClick(event){
    this.state.startPrivateChat(this.state.user,true)
  }
}
