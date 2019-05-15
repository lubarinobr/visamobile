import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import FirebaseLogin from '../FirebaseLogin';


export default class SignUp extends Component {

       
    render() {
        return(
            <FirebaseLogin login={user => console.log('')}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })