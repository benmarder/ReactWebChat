import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

export default class ConversationTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.createTabs = this.createTabs.bind(this);
  }

  createTabs() {
    return this.props.tabs.map((tab) => {
      console.log(`createTabs() tabname:${tab.name} active:${this.props.activeTab}`);
      let isActive = false;
      if (this.props.activeTab === tab.id) {
        isActive = true;
      }
      return (
        <Tab
          onClick={this.props.handleTabClick}
          key={tab.id}
          user={tab}
          isActive={isActive}
          removeTab={this.props.removeTab}
        />);
    });
  }

  render() {
    const componentStyle = {
      display: 'flex',
    };
    return (
      <div style={componentStyle}>
        {this.createTabs()}
      </div>
    );
  }
}

ConversationTabs.propTypes = {
  handleTabClick: PropTypes.func,
  removeTab: PropTypes.func,
  activeTab: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.object),
};
ConversationTabs.defaultProps = {
  handleTabClick: () => {},
  removeTab: () => {},
  activeTab: '',
  tabs: [{}],
};
