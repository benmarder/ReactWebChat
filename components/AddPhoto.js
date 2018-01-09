import React from 'react';


export default class AddPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hide:props.hide
        }
        this.skip = this.skip.bind(this);
        this.upload = this.upload.bind(this);

    }
    render(){
        return(
            <div id="addPhotos" style={styles.component}>
                <h2 style={styles.text} onClick={this.upload}>
                    Upload a Photo
                </h2>
                <input type="file" id="imgUpload" style={{display:"none"}}/> 
                <img style={styles.camera} src="../images/camera.png"/>  
                <h2 style={styles.text} onClick={this.skip}>
                    skip
                </h2>  
            </div>
        );
    }
    upload(){
        document.getElementById("imgUpload").click();
    }

    skip(){
        this.state.hide();
    }
    componentDidMount(){
        console.log("AddPhotos componentDidMount")
        document.getElementById("chatRoom").style.opacity = 0.3;
    }
}
const styles = {
    camera:{
        margin:"15px auto",
        width:"80%",
        height:"auto"
    },
    component:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        width:"200px",
        height:"250px",
        position:"absolute",
        top:"50%",
        left:"50%",
        marginLeft:"-100px",
        marginTop:"-125px",
        padding:"0 25px",
        border:"1px solid black",
        backgroundColor:"#ddc3ce",
        borderRadius:"6px",
        boxSizing:"border-box",
        fontSize:"0.8em"

    },
    text:{
        color:"#fffff0",
        backgroundColor:"#000000",
        textAlign:"center",
        padding:"2px",
        cursor:"pointer",
        fontWeight:"normal"

    }

}