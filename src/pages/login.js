//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity, Text,Alert, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import Loader from '../components/loader';

class Login extends Component {


    state = {email: '', password: '', errorMessage: '', loading: false}

    login = () => {
        this.setState({loading: true});

        if(!this.state.email || !this.state.password) {
            Alert.alert("Você precisa informar todos os campos");
            this.setState({loading: false});
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => {
                switch (error.code) {
                case 'auth/invalid-email':
                    Alert.alert('Aviso', 'Email inválido.');
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    Alert.alert('Aviso', 'Email ou senha incorreto(s)');
                    break;
                default:
                    Alert.alert('Aviso', 'Verifique a sua conexão com a internet');
                }

                this.setState({loading: false});
            });
    }

    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Loader loading={this.state.loading} />
            <View style={styles.formContainer}>
                    <Text style={{alignSelf: 'center', color: 'red', marginTop: 10}}>{this.state.errorMessage}</Text>
                    <StatusBar barStyle="light-content"/>
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

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                    {this.state.isLogin
                        ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                        : <Text style={styles.buttonText}>Login</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text  style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity> 
            </View>
               
         
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
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
        paddingVertical: 15,
        marginBottom: 20,
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
    formContainer: {
        padding: 20
    },
    spinner: {
        height: 10,
    },
});

//make this component available to the app
export default Login;