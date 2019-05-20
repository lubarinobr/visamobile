import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, StatusBar, TouchableOpacity, View, Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class Signup extends Component {

    state = {name: '', email: '', password: '', confirmPassword: ''}

    singup = () => {

      console.log(this.state);
        
        if(!this.state.name || !this.state.email || !this.state.password || !this.state.confirmPassword) {
            Alert.alert("Você precisa preencher todos os campos");
            return;
        } 

        if(this.state.password != this.state.confirmPassword) {
            Alert.alert("As senha não são iguais");
            return ;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    
    render() {
      return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

              <View style={styles.formContainer}>
                <Text style={{color: 'red', alignSelf: 'center', margin: 20}}>{this.state.errorMessage}</Text>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input}
                            onChangeText={name => this.setState({name})} 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={true}  
                            returnKeyType="next" 
                            placeholder='Nome' 
                            placeholderTextColor='rgba(225,225,225,0.7)'/>


                <TextInput style = {styles.input}
                            onChangeText={email => this.setState({email})} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address' 
                            returnKeyType="next" 
                            placeholder='Email' 
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}   
                           onChangeText={password => this.setState({password})}
                           placeholder='Senha' 
                           placeholderTextColor='rgba(225,225,225,0.7)' 
                           secureTextEntry/>

                <TextInput style = {styles.input}   
                           onChangeText={confirmPassword => this.setState({confirmPassword})}
                           placeholder='Confirma Senha' 
                           placeholderTextColor='rgba(225,225,225,0.7)' 
                           secureTextEntry/>           
                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.singup}>
                    <Text  style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity> 
            </View>
            
      
          </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2c3e50',
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    },
    formContainer: {
      marginLeft: 20,
      marginBottom: 20,
      marginRight: 20,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
      color: '#fff'
    },
  })