import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import ChatWindow from "./ChatWindow";
import ChatUsers from "./ChatUsers";
import pickRandomColor from '../scripts/randomRGB';
import ConversationTabs from './ConversationTabs';
export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    let tabs = new Map();
    tabs.set("Lobi", { name: "Lobi", id: "Lobi" });
    this.state = {
      user:props.user,
      tabs: tabs,
      activeTab:"Lobi"
    };
    localStorage.setItem('color', pickRandomColor());
    this.removeTab = this.removeTab.bind(this);
    this.userClickHandler = this.userClickHandler.bind(this);
    this.hasTab = this.hasTab.bind(this);
  }
  render() {
    const componentStyle = {
      height: "inherit",
      display: "flex",
      flexDirection: "column"
    },
    conversationTabsStyle = {
      height:"4vh%"
    },
      chatStyle = {
        flex: "auto",
        height: "fit-content",
        maxHeight:"92%",
        boxShadow: "5px 5px 5px #c1c1c1"
      },
      chatWindowStyle = {
        float: "left",
        width: "70%",
        height: "100%",
        overflow:"hidden"
      },
      chatUsersStyle = {
        float: "left",
        width: "30%",
        height: "100%"
      };
    console.log("chat room rendering:!!!!::::", Array.from(this.state.tabs.values()))
    return (
      <div style={componentStyle}>
        <ConversationTabs style={conversationTabsStyle}
                          tabs={Array.from(this.state.tabs.values())} 
                          activeTab={this.state.activeTab} 
                          removeTab={this.removeTab}
                          handleTabClick={this.userClickHandler} />
        <div style={chatStyle}>
          <div style={chatWindowStyle}>
            <ChatWindow user={this.state.user} activeTab={this.state.activeTab} createTab={this.userClickHandler} hasTab={this.hasTab} />
          </div>
          <div style={chatUsersStyle}>
            <ChatUsers userClickHandler={this.userClickHandler} userName={this.props.userName} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("chat room componentDidMount")
    document.getElementById("background").className = "blur";
  }

  removeTab(tab) {
    console.log("removeTab() tab:", tab);
    let newState = { ...this.state }
    newState.tabs.delete(tab);
    newState.activeTab = "Lobi";
    this.setState(newState);
  }
  hasTab(user){
    this.state.tabs.has(user.name);
  }
  userClickHandler(user,makeActive) {
    console.log(`user : ${JSON.stringify(user)}`);
    let newState = { ...this.state };
    if (!this.hasTab(user)) {
      newState.tabs.set(user.name, user);
    }
    if(makeActive)
      newState.activeTab = user.id;
    console.log("new actuve tag!:::::::::::", newState.activeTab)
    this.setState(newState);
  }
}
