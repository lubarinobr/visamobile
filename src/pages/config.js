import React , { Component, Fragment } from 'react';
import { View, Button, TextInput, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
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
        <View>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={values => this.signup(values)}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required(),
            })}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <Fragment>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="E-mail"
                />
                {touched.email && errors.email &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }
                <Button
                  title='Logar'
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </Fragment>
            )}
          </Formik>
          </View>
        );
      } 
}

Config.navigationOptions = {
    title: "Configuração",
    tabBarIcon: <Icon name="tools" size={25} color="#999" />
}