import React, { Component } from 'react';
import { View, Text, InputText, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

export default class SignUp extends Component {

    state = {name: '', email: '', password: '', errorMessage: null }

    handleSignUp = async () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                user.updateProfile({
                    displayName: this.state.name
                });
    
                this.props.navigation.navigate('Main');    
            })
            .catch( error => {
                console.log(error)
                this.setState({errorMessage: error.message});
            });
      }

    render() {
        return(
            <View style={styles.container}>
                <Text>Cadastro</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Nome"
                    style={styles.textInput}
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                />
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Senha"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    />
                <Button title="Cadastrar" onPress={this.handleSignUp} />
                <Button
                title="Já tem uma conta? Login"
                onPress={() => this.props.navigation.navigate('Login')}
                />    
            </View>
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