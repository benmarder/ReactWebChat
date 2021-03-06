import firebase from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import db from '../database/database';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onilneUsersRef: db.ref().child('onlineUsers'),
    };
    firebase.auth().signInAnonymously();
    // bind functions
    this.validate = this.validate.bind(this);
    this.checkIfUsernameExists = this.checkIfUsernameExists.bind(this);
    this.checkIfUserIdExists = this.checkIfUserIdExists.bind(this);
  }
  setFirebaseUser(name, id, image) {
    const userOnline = this.state.onilneUsersRef.child(id);
    userOnline.set({ name }).then(() => userOnline.onDisconnect().remove());
    const user = {
      name,
      id,
      image: image || null,
    };
    this.props.setUser(user);
  }
  /* function that handles the user input from the username field */
  validate(element) {
    element.preventDefault();
    const userName = document.querySelector('input').value;
    const usernamePattern = /^\w{1,6}$/;
    if (!(usernamePattern.test(userName))) {
      alert('the username you entered is not valid, please enter a name between 1-6 characters with no spaces');
      return;
    }
    this.checkIfUsernameExists(userName)
      .then(this.checkIfUserIdExists)
      .then((fireBaseUser) => {
        this.setFirebaseUser(userName, fireBaseUser.uid);
      })
      .catch(error => alert(error.message));
  }
  /* function that checks if the current firebase user (user session) already exists in the chat. */
  checkIfUserIdExists() {
    return new Promise((resolve, reject) => {
      // fireBase auth
      firebase.auth().onAuthStateChanged((fireBaseUser) => {
        this.state.onilneUsersRef.once('value', (snapshot) => {
          // check if user is already logged in
          if (snapshot.hasChild(fireBaseUser.uid)) {
            reject(new Error('you are trying to log in twice from one session. (for testing : try other browser or incognito)'));
          } else resolve(fireBaseUser);
        });
      });
    });
  }
  /* function that checks if the given username already exists in the chat. */
  checkIfUsernameExists(userName) {
    return new Promise((resolve, reject) => {
      this.state.onilneUsersRef.orderByChild('name').equalTo(userName).once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          reject(new Error(`the username ${userName} already in chat, please enter a different one`));
        } else resolve();
      });
    });
  }
  render() {
    return (
      <div>
        <div id="landing">
          <h1 style={styles.wellcome}>WELCOME!</h1>
          <h2 style={styles.intro}>
            This is the best chat ever built by the finest engineers<br />from all over the world
          </h2>
          <form style={styles.form} action="" onSubmit={this.validate}>
            <input
              style={styles.input}
              type="text"
              placeholder="Please enter a nickname (1-6 characters)"
              required
            />
            <input style={{ ...styles.input, ...styles.button }} type="submit" value="LET'S GO" />
          </form>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  setUser: PropTypes.func,
};
SignIn.defaultProps = {
  setUser: () => { },
};
const styles = {
  wellcome: {
    margin: '0',
    paddingTop: '3%',
    fontSize: '9.5vw',
    letterSpacing: '0.3em',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  intro: {
    textTransform: 'uppercase',
    fontSize: '1.1vw',
    fontWeight: '1',
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: '0.2em',
    margin: '0 auto',
    width: '66%',
  },
  form: {
    width: '40%',
    margin: '0 auto',

  },
  input: {
    width: '100%',
    borderRadius: '9px',
    border: 'none',
    outline: 'none',
    height: '7vh',
    marginTop: '5vh',
    textAlign: 'center',
    boxShadow: 'none',
  },
  button: {
    marginTop: '2vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
};
