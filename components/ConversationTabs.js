import React from 'react';
import Tab from './Tab'
export default class ConversationTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab,
        };
        this.createTabs = this.createTabs.bind(this);

    }

    render() {
        const componentStyle = {
            ...this.props.style,
            display: "flex",
        }
        return (
            <div style={componentStyle}>
                {this.createTabs()}
            </div>
        );
    }
    createTabs() {
        return this.props.tabs.map((tab, index) => {
            console.log(`createTabs() tabname:${tab.name} active:${this.props.activeTab}`)
            let isActive = false;
            if (this.props.activeTab === tab.id)
                isActive = true;
            return <Tab
                onClick={this.props.handleTabClick}
                key={index}
                user={tab}
                isActive={isActive}
                removeTab={this.props.removeTab} />
        });
    }

}
