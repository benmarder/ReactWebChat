import React from 'react';
import db from '../database/database';
import firebase from 'firebase';
import ChatWindow from "./ChatWindow";
import ChatUsers from "./ChatUsers";
import pickRandomColor from '../scripts/randomRGB';
import ConversationTabs from './ConversationTabs';
import AddPhoto from './AddPhoto';
export default class ChatRoom extends React.Component {

  constructor(props) {
    super(props);
    let tabs = new Map();
    tabs.set("Lobi", { name: "Lobi", id: "Lobi" });
    this.state = {
      user: props.user,
      tabs: tabs,
      activeTab: "Lobi"
    };
    localStorage.setItem('color', pickRandomColor());
    this.removeTab = this.removeTab.bind(this);
    this.startPrivateChat = this.startPrivateChat.bind(this);
    this.hasTab = this.hasTab.bind(this);
  }
  render() {
    return (
      <div style={styles.component}>
        <main id="chatRoom" style={styles.chatRoom}>
          <ConversationTabs
            style={styles.conversationTabs}
            tabs={Array.from(this.state.tabs.values())}
            activeTab={this.state.activeTab}
            removeTab={this.removeTab}
            handleTabClick={this.startPrivateChat} />
          <div style={styles.chat}>
            <ChatWindow
              style={styles.chatWindow}
              user={this.state.user}
              activeTab={this.state.activeTab}
              createTab={this.startPrivateChat}
              hasTab={this.hasTab} />
            <ChatUsers
              style={styles.chatUsers}
              startPrivateChat={this.startPrivateChat}
              activeUser={this.state.user}
              showPhotoUpload={this.showPhotoUpload} />
          </div>
        </main>
        <AddPhoto user={this.state.user} hide={this.hidePhotoUpload} />
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
  hasTab(user) {
    this.state.tabs.has(user.name);
  }
  startPrivateChat(user, makeActive) {
    console.log(`user : ${JSON.stringify(user)}`);
    let newState = { ...this.state };
    if (!this.hasTab(user)) {
      newState.tabs.set(user.name, user);
    }
    if (makeActive)
      newState.activeTab = user.id;
    console.log("new actuve tag!:::::::::::", newState.activeTab)
    this.setState(newState);
  }
  hidePhotoUpload(){
    console.log("hideee")
    document.getElementById("addPhotos").style.visibility = "hidden";
    document.getElementById("chatRoom").style.opacity = 1;
  }
  showPhotoUpload(){
    document.getElementById("addPhotos").style.visibility = "visible";
    document.getElementById("chatRoom").style.opacity = 0.3;
  }

}
const styles = {
  component:{
    height: "inherit"
  },
  chatRoom: {
    height: "inherit",
    display: "flex",
    flexDirection: "column"
  },
  conversationTabs: {
    height: "4vh%"
  },
  chat: {
    flex: "auto",
    height: "fit-content",
    maxHeight: "92%",
    borderRadius: "0 9px 9px",
    overflow: "hidden",
    boxSizing: "border-box",
    boxShadowBottom: "3px 3px 5px #c1c1c1",
  },
  chatWindow: {
    float: "left",
    width: "70%",
    height: "100%",
    overflow: "hidden"
  },
  chatUsers: {
    float: "left",
    width: "30%",
    height: "100%"
  }
}