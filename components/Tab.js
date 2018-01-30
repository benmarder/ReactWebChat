import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    let exitVisibility = 'visible';
    if (props.user.id === 'Lobi') {
      exitVisibility = 'hidden';
    }
    this.state = {
      user: this.props.user,
      removeTab: props.removeTab,
      exitVisibility,
      tabClicked: props.onClick,
    };
    this.removeTab = this.removeTab.bind(this);
    this.handletabClicked = this.handletabClicked.bind(this);
  }

  handletabClicked() {
    this.state.tabClicked(this.state.user, true);
  }
  removeTab(event) {
    event.stopPropagation();
    this.state.removeTab(event.target.name);
  }
  render() {
    let componentBgColor = '#ffffff';
    if (this.props.isActive) {
      componentBgColor = '#f3f3f3';
    }
    const componentStyle = {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '0.4%',
      flexBasis: '10%',
      backgroundColor: componentBgColor,
      borderRadius: '9px 9px 0 0',
      color: '#1c2430',
      fontSize: '1em',
      overflow: 'hidden',
    };
    const textStyle = {
      lineHeight: '28px',
    };
    const exitStyle = {
      cursor: 'pointer',
      visibility: this.state.exitVisibility,
      color: '#FF4136',
      backgroundColor: 'inherit',
      border: 'none',
      marginRight: '4px',
    };
    return (
      <div style={componentStyle} onClick={this.handletabClicked}>
        <span style={{ visibility: 'hidden' }}>
          x
        </span> {/* help align center the text using flex */}
        <span style={textStyle}>
          {this.state.user.name}
        </span>
        <button style={exitStyle} onClick={this.removeTab} name={this.state.user.name}>
          x
        </button>
      </div>
    );
  }
}
Tab.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string || null,
  }),
  isActive: PropTypes.bool,
  removeTab: PropTypes.func,
  onClick: PropTypes.func,
};
Tab.defaultProps = {
  user: {},
  isActive: false,
  removeTab: () => {},
  onClick: () => {},
};
