import React from 'react';
import PropTypes from 'prop-types';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPrivateChat: props.startPrivateChat,
      showPhotoUpload: props.showPhotoUpload,
      user: props.user,
      isActiveUser: props.isActiveUser,
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.state.startPrivateChat(this.state.user, true);
  }

  render() {
    const componentStyle = {
      display: 'block',
      backgroundColor: '#1c2430',
      height: '30px',
      padding: '2px 0',
      cursor: 'pointer',
      borderBottom: this.props.borderBottom,
    };
    const nameStyle = {
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      height: '100%',
      margin: 'auto',
      lineHeight: '100%',
      color: '#FFFFFF',
    };
    const onlineStyle = {
      height: '14px',
      width: '14px',
      borderRadius: '50%',
      backgroundColor: '#2ecc71',
    };
    const textStyle = {
      fontSize: '1em',
      height: '100%',
      flex: 'auto',
      lineHeight: '30px',
      textAlign: 'center',

    };
    const profifePicStyle = {
      height: '17px',
      width: '17px',
      borderRadius: '50%',
    };
    let clickHandler;
    if (this.state.isActiveUser) { // if the user is the active user, his click is to change photo.
      clickHandler = this.state.showPhotoUpload;
    } else {
      clickHandler = this.handleClick;
    } // if not, his click is to open a conversation.
    return (
      <li style={componentStyle}>
        <div style={nameStyle} onClick={clickHandler}>
          <span style={onlineStyle} />
          <p style={textStyle}>
            {this.state.user.name}
          </p>
          <img src={this.props.user.image || '/images/icon.png'} style={profifePicStyle} alt="profile pic" />
        </div>
      </li>
    );
  }
}
User.propTypes = {
  borderBottom: PropTypes.string,
  startPrivateChat: PropTypes.func,
  showPhotoUpload: PropTypes.func,
  isActiveUser: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
  }),
};
User.defaultProps = {
  borderBottom: '',
  startPrivateChat: () => {},
  showPhotoUpload: () => {},
  isActiveUser: false,
  user: {},
};
