import React from 'react';
import calcTimePassed from '../scripts/timecalculator'
export default class Message extends React.Component {

  constructor(props) {
    super(props);
    this.handleNouseIn = this.handleNouseIn.bind(this);
    let state_ = {
      date: new Date(Date.now()),
      imgSrc: "../images/icon2.png",
      arrowSrc: "../images/arrow2.png",
      componentStyle: {
        //  display:"none",
        float: "left",
        width: "90%",
        margin: "1% 5%",
        fontWeight: "normal!important"
      },
      userStyle: {
        float: "left",
        display: "inline-block",
        verticalAlign: "top",
        width: "9%",
      },
      profilePicStyle: {
        width: "80%",
        maxHeight: "80%",
      },
      arrowStyle: {
        verticalAlign: "top",
        marginTop: "10px",
        maxHeight: "20%",
        maxWidth: "20%"
      },
      userNameStyle: {
        color: this.props.val.color,
        marginRight: "20%",
        fontSize: "0.8vmax ",
        lineHeight: "100%",
      },
      textContainerStyle: {
        float: "left",
        display: "inline-block",
        maxWidth: "80%",
        marginTop: "6px"
      },
      pStyle: {
        fontSize: "1.1em ",
        margin: "0 -1px",
        borderRadius: "7px",
        backgroundColor: "#c1c1c1",
        color: "#1c2430",
        padding: "5px",
        wordWrap: "break-word"
      },
      timeStyle: {
        float: "left",
        lineHeight: "100%",
        display: "inline-block",
        margin: "2px 0 0 4px",
        fontSize: "0.6em",
        color: "#c1c1c1"
      },
    };
    if (props.isMyMessage) {     //sent messages look different 
      state_.imgSrc = "";
      state_.arrowSrc = "../images/arrow2white.png";
      state_.componentStyle.float = "right";
      state_.textContainerStyle.float = "right";
      state_.arrowStyle = { ...state_.arrowStyle, float: "left", maxWidth: "0.8vw", paddingRight: "0.2em" };
      state_.userStyle = { ...state_.userStyle, float: "right", width: "auto" };
      state_.pStyle.backgroundColor = "#ffffff";
      state_.userNameStyle.display = "none";
      state_.profilePicStyle.display = "none";
    }

    this.state = state_;
  }
  render() {
    console.log(this.state.date.toLocaleTimeString());
    return (
      <div className="message" style={this.state.componentStyle}>
        <div style={this.state.userStyle}>
          <img src={this.state.imgSrc} style={this.state.profilePicStyle} />
          <img src={this.state.arrowSrc} style={this.state.arrowStyle} />
          <h4 style={this.state.userNameStyle}>
            <div style={{ textAlign: "center" }}>
              {this.props.val.name}
            </div>
          </h4>
        </div>
        <div style={this.state.textContainerStyle} onMouseEnter={this.handleNouseIn}>
          <p style={this.state.pStyle}>
            {this.props.val.message}
          </p>
          <h5 style={this.state.timeStyle}>
            {this.state.date.toLocaleTimeString()}
          </h5>
        </div>
      </div>
    );

  }
  componentDidMount() {
    //$(".message").fadeIn("slow");
  }
  handleNouseIn(event) {
    let string = calcTimePassed(this.props.val.timeStamp);
    event.target.setAttribute("title", string);
  }
}
