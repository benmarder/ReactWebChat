import React from 'react';
import PropTypes from 'prop-types';
import calcTimePassed from '../scripts/timeCalculator';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleNouseIn = this.handleNouseIn.bind(this);
    const stateObj = {
      date: new Date(Date.now()),
      imgSrc: props.profilePic,
      arrowSrc: '../images/arrow2.png',
      componentStyle: {
        float: 'left',
        width: '90%',
        margin: '1% 5%',
        fontWeight: 'normal!important',
      },
      userStyle: {
        float: 'left',
        display: 'inline-block',
        verticalAlign: 'top',
        width: '9%',
      },
      profilePicStyle: {
        width: '80%',
        maxHeight: '80%',
      },
      arrowStyle: {
        verticalAlign: 'top',
        marginTop: '10px',
        maxHeight: '20%',
        maxWidth: '20%',
      },
      userNameStyle: {
        color: this.props.val.color,
        marginRight: '20%',
        fontSize: '0.8vmax ',
        lineHeight: '100%',
      },
      textContainerStyle: {
        float: 'left',
        display: 'inline-block',
        maxWidth: '80%',
        marginTop: '6px',
      },
      pStyle: {
        fontSize: '1.1em ',
        margin: '0 -1px',
        borderRadius: '7px',
        backgroundColor: '#c1c1c1',
        color: '#1c2430',
        padding: '5px',
        wordWrap: 'break-word',
        textAlign: 'center',
      },
      timeStyle: {
        float: 'left',
        lineHeight: '100%',
        display: 'inline-block',
        margin: '2px 0 0 4px',
        fontSize: '0.6em',
        color: '#c1c1c1',
      },
    };
    if (props.isMyMessage) { // sent messages look different
      stateObj.imgSrc = '';
      stateObj.arrowSrc = '../images/arrow2white.png';
      stateObj.componentStyle.float = 'right';
      stateObj.textContainerStyle.float = 'right';
      stateObj.arrowStyle = {
        ...stateObj.arrowStyle,
        float: 'left',
        maxWidth: '0.8vw',
        paddingRight: '0.2em',
      };
      stateObj.userStyle = {
        ...stateObj.userStyle,
        float: 'right',
        width: 'auto',
      };
      stateObj.pStyle.backgroundColor = '#ffffff';
      stateObj.userNameStyle.display = 'none';
      stateObj.profilePicStyle.display = 'none';
    }

    this.state = stateObj;
  }
  handleNouseIn(event) {
    const string = calcTimePassed(this.props.val.timeStamp);
    event.target.setAttribute('title', string);
  }
  render() {
    console.log('image: ', this.state.imgSrc);
    return (
      <div className="message" style={this.state.componentStyle}>
        <div style={this.state.userStyle}>
          <img src={this.state.imgSrc} style={this.state.profilePicStyle} alt="profile pic" />
          <img src={this.state.arrowSrc} style={this.state.arrowStyle} alt="arrow" />
          <h4 style={this.state.userNameStyle}>
            <div style={{ textAlign: 'center' }}>
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
}

Message.propTypes = {
  val: PropTypes.shape({
    message: PropTypes.string,
    timeStamp: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  profilePic: PropTypes.string,
  isMyMessage: PropTypes.bool,
};
Message.defaultProps = {
  val: {
    message: '',
    timeStamp: 0,
    name: '',
    color: 'black',
  },
  profilePic: '../images/icon2.png',
  isMyMessage: false,
};
