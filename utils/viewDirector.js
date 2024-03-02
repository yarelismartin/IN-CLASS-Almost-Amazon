import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import startApp from './startApp';
import client from './client';

/* This is how we know if a user is loged in
if they are then we can track their uid so the server
only renders the users specific content
 */
const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    // if user is loged in then attach the uid to it in your starApp
    if (user) {
      // person is logged in do something...
      startApp(user.uid);
    } else {
      // person is NOT logged in
      loginButton();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
