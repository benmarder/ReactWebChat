import React from 'react';
import firebase from 'firebase';
import db from '../database/database';

export default class AddPhotos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:props.user,
            hide:props.hide,
            imgUrl:"../images/camera.png",
            buttonText:"skip"
        }
        this.skip = this.skip.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
    }
    render(){
        return(
            <div id="addPhotos" style={styles.component}>
                <div className="loader"></div>
                <h2 className="hoverable" style={styles.text} onClick={this.selectFile}>
                    Upload a Photo
                </h2>
                <input type="file" id="imgUpload" onChange={this.uploadFile} style={{display:"none"}}/> 
                <img id="img" style={styles.camera} src={this.state.imgUrl} onLoad={this.hideLoader}/>  
                <h2 className="hoverable" style={styles.text} onClick={this.skip}>
                    {this.state.buttonText}
                </h2>  
            </div>
        );
    }
    uploadFile(){
        const loader = document.getElementsByClassName("loader")[0];
        loader.style.visibility = "visible";
        const input = document.getElementById("imgUpload");
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }   
        if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Error: no file");               
        }
        else {
            const file = input.files[0],
            ValidImageTypes = ["image/gif", "image/jpeg", "image/png"],
            fileType = file["type"];
            if (!ValidImageTypes.includes(fileType)) {
                alert("Upload error! the file type is not of type image");
                return;
            }
            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            var storageRef = firebase.storage().ref();
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('images/' + this.state.user.id).put(file, metadata);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot)=>{
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },(error)=>{
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                    case 'storage/canceled':
                    // User canceled the upload
                    break;
                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            },()=>{
                console.log("done! i have adownloadURL");
                 // Upload completed successfully, now we can get the download URL
                 const downloadURL = uploadTask.snapshot.downloadURL;
                this.setState({
                    ...this.state,
                    imgUrl:downloadURL
                });
               db.ref("onlineUsers/" + this.state.user.id).set({
                   name:this.state.user.name,
                   image:downloadURL
               });
            });
        }
    }
    hideLoader(){
        console.log("hideLoader");
        const loader = document.getElementsByClassName("loader")[0];
        loader.style.visibility = "hidden";
        this.setState({
            ...this.state,
            buttonText:"Continue"
        });
    }
    selectFile(){
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
        top:"calc(50% - 125px)",
        left:"calc(50% - 100px)",
        padding:"0 25px",
        border:"1px solid black",
        backgroundColor:"#f3f3f3",
        borderRadius:"6px",
        boxSizing:"border-box",
        fontSize:"0.8em"

    },
    text:{
        color:"#fffff0",
        backgroundColor:"#1c2430",
        textAlign:"center",
        padding:"2px",
        cursor:"pointer",
        fontWeight:"normal"
    }
}