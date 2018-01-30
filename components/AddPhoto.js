import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import db from '../database/database';

export default class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      hide: props.hide,
      imgUrl: '../images/camera.png',
      buttonText: 'skip',
    };
    this.skip = this.skip.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
  }
  componentDidMount() {
    console.log('AddPhoto componentDidMount');
    document.getElementById('chatRoom').style.opacity = 0.3;
  }
  uploadFile() {
    const input = document.getElementById('imgUpload');
    try {
      if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        throw Error('The File APIs are not fully supported in this browser.');
      }
      if (!input.files) {
        throw Error("This browser doesn't seem to support the `files` property of file inputs.");
      } else if (!input.files[0]) {
        throw Error('Error: no file');
      } else {
        const file = input.files[0];
        const ValidImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        const fileType = file.type;
        if (!ValidImageTypes.includes(fileType)) {
          throw Error('Upload error! the file type is not of type image');
        }
        const loader = document.getElementsByClassName('loader')[0];
        loader.style.visibility = 'visible';
        // Create the file metadata
        const metadata = {
          contentType: 'image/jpeg',
        };
        const storageRef = firebase.storage().ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = storageRef.child(`images/${this.state.user.id}`).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            /* Get task progress, including the number of bytes uploaded
             and the total number of bytes to be uploaded */
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
              default:
            }
          }, (error) => {
            throw error;
          }, () => {
            console.log('done! i have adownloadURL');
            // Upload completed successfully, now we can get the download URL
            const url = uploadTask.snapshot.downloadURL;
            this.setState({
              ...this.state,
              imgUrl: url,
            });
            db.ref(`onlineUsers/${this.state.user.id}`).update({
              name: this.state.user.name,
              image: url,
            });
          },
        );
      }
    } catch (error) {
      this.hideLoader();
      alert(error.message);
    }
  }
  hideLoader() {
    console.log('hideLoader');
    const loader = document.getElementsByClassName('loader')[0];
    loader.style.visibility = 'hidden';
    this.setState({
      ...this.state,
      buttonText: 'Continue',
    });
  }
  selectFile() {
    document.getElementById('imgUpload').click();
  }

  skip() {
    this.state.hide();
  }

  render() {
    return (
      <div id="addPhoto" style={styles.component}>
        <div className="loader" />
        <div className="hoverable" style={styles.text} onClick={this.selectFile}>
            Upload a Photo
        </div>
        <input type="file" id="imgUpload" onChange={this.uploadFile} style={{ display: 'none' }} />
        <img
          id="img"
          style={styles.camera}
          src={this.state.imgUrl}
          onLoad={this.hideLoader}
          alt="icon"
        />
        <div className="hoverable" style={styles.text} onClick={this.skip}>
          {this.state.buttonText}
        </div>
      </div>
    );
  }
}

AddPhoto.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
  }),
  hide: PropTypes.func,
};
AddPhoto.defaultProps = {
  user: {},
  hide: () => {},
};
const styles = {
  camera: {
    margin: '15px auto',
    width: '80%',
    height: 'auto',
  },
  component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '200px',
    height: '250px',
    position: 'absolute',
    top: 'calc(50% - 125px)',
    left: 'calc(50% - 100px)',
    padding: '0 25px',
    border: '1px solid black',
    backgroundColor: '#f3f3f3',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '1.2em',
  },
  text: {
    color: '#fffff0',
    backgroundColor: '#1c2430',
    textAlign: 'center',
    padding: '2px',
    cursor: 'pointer',
    fontWeight: 'normal',
  },
};
