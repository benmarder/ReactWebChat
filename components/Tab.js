import React from 'react';

export default class Tab extends React.Component {

    constructor(props) {
        super(props);
        let exitVisibility = "visible";
        
        if(props.user.id === "Lobi") //Lobi tab is unremovable
            exitVisibility = "hidden";
        this.state = {
            user:this.props.user,
            removeTab:props.removeTab,
            exitVisibility:exitVisibility,
            tabClicked:props.onClick
        };      
        this.removeTab = this.removeTab.bind(this);
        this.handletabClicked = this.handletabClicked.bind(this);
    }
    
    render(){
        let componentBgColor = "#ffffff";
        if(this.props.isActive)
            componentBgColor = "#f3f3f3"
        const componentStyle = {
            cursor: "pointer",
            display:"flex",
            justifyContent:"space-between",
            marginRight:"0.4%",
            flexBasis:"10%",
            backgroundColor:componentBgColor,
            borderRadius:"9px 9px 0 0",
            color:"#1c2430",
            fontSize:"1em",
            overflow:"hidden"
        },
        textStyle = {
            lineHeight:"28px"
        },
        exitStyle = {
            cursor: "pointer",
            visibility:this.state.exitVisibility,
            color:"#FF4136",
            backgroundColor:"inherit",
            border:"none",
            marginRight:"4px"
        };
        return (
            <div style={componentStyle} onClick={this.handletabClicked}>
                <span style={{visibility:"hidden"}}>x</span> {/*to align center just the text using flex*/}
                <span style={textStyle}>
                    {this.state.user.name}
                </span>
                <button style={exitStyle} onClick={this.removeTab} name={this.state.user.name}>
                    x
                </button>
            </div>
        );
    }
    handletabClicked(){
        this.state.tabClicked(this.state.user,true);
    }
    removeTab(event){
        event.stopPropagation();
        this.state.removeTab(event.target.name);
    }

}
