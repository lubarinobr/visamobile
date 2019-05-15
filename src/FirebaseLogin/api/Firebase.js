import firebase from "react-native-firebase";
import { Alert } from 'react-native';

class Firebase {

  userLogin = (email, password) => {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Warning', 'Invalid email address format.');
              break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              Alert.alert('Warning', 'Invalid email address or password');
              break;
            default:
              Alert.alert('Warning', 'Check your internet connection');
          }
          resolve(null);
        }).then(user => {
        if (user) {
          resolve(user);
        }
      });
    })
  };

  createFirebaseAccount = (name, email, password) => {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Warning', 'This email address is already taken');
            break;
          case 'auth/invalid-email':
            Alert.alert('Warning', 'Invalid e-mail address format');
            break;
          case 'auth/weak-password':
            Alert.alert('Warning', 'Password is too weak');
            break;
          default:
            Alert.alert('Warning', 'Check your internet connection');
        }
        resolve(false);
      }).then(info => {
        if (info) {
          firebase.auth().currentUser.updateProfile({
            displayName: name
          });
          resolve(true);
        }
      });
    });
  };

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Warning', 'Email with new password has been sent');
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Warning', 'Invalid email address format');
              break;
            case 'auth/user-not-found':
              Alert.alert('Warning', 'User with this email does not exist');
              break;
            default:
              Alert.alert('Warning', 'Check your internet connection');
          }
          resolve(false);
        });
    })
  };

}

export default new Firebase();
