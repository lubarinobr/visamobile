import React , { Component, Fragment } from 'react';
import { View, Button, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Config extends Component {

    logout = async () => {
      try {
          await firebase.auth().signOut();
          this.props.navigation.navigate('Loading');
      }catch ( erro ) {
          console.log(error.message);
      }
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.notificationTitle}>Receber notificações por: </Text>
            <View style={styles.listDocument}>
            
              <CheckBox
              textStyle={styles.checkboxTitle}
              title='Email'
              checked={true}
                            />

              <CheckBox
              textStyle={styles.checkboxTitle}
              title='Notificação'
              checked={true}
                            />              
      
            </View>

            <View style={styles.logoutButtom}>
                  <Button
                      onPress={this.logout}
                      title="Sair"
                  />
              </View>
          </View>
        );
      } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoutButtom: {
    margin: 10,
  },
  checkboxTitle: {
    fontFamily: 'Roboto-Thin'
  },
  listDocument: {
    marginTop: 20,
  },
  notificationTitle: {
    margin: 10,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    alignSelf: 'center',
    color: '#1a73e8',
  },

});