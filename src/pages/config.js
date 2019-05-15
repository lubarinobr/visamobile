import React , { Component, Fragment } from 'react';
import { View, Button, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import * as yup from 'yup'

export default class Config extends Component {

    signup = async (value) => {
        const { email } = value;

        try {
          await api.get(`/users?email=${email}`);
          await AsyncStorage.setItem("email", email);
          this.props.navigation.navigate('Home');
        }catch ( error ) {
          console.log(error);
          Alert.alert("Usuário não encontrado");
        }
    }

    componentDidMount() {
      this.getEmail();
    }

    getEmail = async () => {
      const email = await AsyncStorage.getItem("email");

      if(email) {
        this.props.navigation.navigate('Home');
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

Config.navigationOptions = {
    title: "Configuração",
    tabBarIcon: <Icon name="tools" size={25} color="#FFF" />
}