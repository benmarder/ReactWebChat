import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(event.target.value);
      document.getElementById('input').value = '';
    }
  }

  render() {
    const componentStyle = {
      width: '100%',
      height: '100%',
      borderRadius: '9px',
      border: '1px solid #9d9d9d',
      outline: 'none',
      padding: '2%',
      boxSizing: 'border-box',
    };

    return (
      <input
        type="text"
        id="input"
        style={componentStyle}
        onKeyDown={this.handleKeydown}
        placeholder="write a new message"
      />
    );
  }
}

Input.propTypes = {
  newMessage: PropTypes.func,
};
Input.defaultProps = {
  newMessage: () => {},
};
