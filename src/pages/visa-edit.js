import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Input , Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

export default class VisaEdit extends Component {

    state = {
        username : null,
        password : null,
        userId: null,
        usernameErrorMessage: '',
        passwordErrorMessage: '',
        visaId: null,
    }

    componentDidMount() {
        let userId = this.props.navigation.getParam('userId');
        let username = this.props.navigation.getParam('username');
        let password = this.props.navigation.getParam('password');
        let visaId = this.props.navigation.getParam('visaId');
        password = password ? password : 'Test';
        visaId = visaId ? visaId : 'Test';
        this.setState({userId, username, password, visaId});
    }

    submitVisa = async () => {

        this.setState({usernameErrorMessage: '', passwordErrorMessage: ''});

        if(!this.state.username || !this.state.username.trim()) {
            this.setState({usernameErrorMessage: "Você precisa inserir o usuário"});
            return;
        }

        if(!this.state.password) {
            this.setState({passwordErrorMessage: "Você precisa inserir a senha do usuário"});
            return;
        }
        
        await api.put(`/visas/user/${this.state.userId}`, {username : this.state.username, password: this.state.password});

        this.props.navigation.navigate('Main');
    }

    deleteVisa = async () => {
        await api.delete('/visas/user');
    }

    render(){
        return (
            <View style={styles.container}>

                <View style={styles.welcomeView}>
                    <Text style={styles.visaWelcomeTitle}>Edite os dados de acesso do seu visto aqui.</Text>
                </View>
                <Divider style={{backgroundColor: '#1a73e8', marginTop: 10}} />
                <View style={styles.visaForm}>
                    <Input
                        autoCapitalize="none"
                        defaultValue={this.state.username}
                        containerStyle={{paddingBottom: 20}}
                        placeholder="Username"
                        shake={true}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.usernameErrorMessage}
                        onChangeText={username => this.setState({username})}
                        rightIcon={
                            <Icon 
                                name="person"
                                size={24}
                            />
                        }
                    />
                    <Input 
                        autoCapitalize="none"
                        defaultValue={this.state.password}
                        placeholder="senha"
                        secureTextEntry={true}
                        shake={true}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordErrorMessage}
                        onChangeText={password => this.setState({password})}
                        rightIcon={
                            <Icon 
                                name="lock"
                                size={24}
                            />
                        }
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}> 
                        <Button 
                            containerStyle={{ width: 150}}
                            title="Salvar"
                            iconRight
                            onPress={() => this.submitVisa()}
                            icon={
                                <Icon 
                                    name="check-circle"
                                    size={15}
                                    color="white"
                                />
                            }
                        />
                        <Button 
                            containerStyle={{width: 150}}
                            buttonStyle={{backgroundColor: '#FB6567'}}
                            title="Excluir"
                            iconRight
                            onPress={() => this.submitVisa()}
                            icon={
                                <Icon 
                                    name="check-circle"
                                    size={15}
                                    color="white"
                                />
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    } ,
    welcomeView: {
     margin: 10,
     alignItems: 'center'
    },
    visaWelcomeTitle: {
     fontFamily: 'Roboto-Black',
     fontSize:20,
     color: '#1a73e8'
    },
    visaForm: {
         marginTop: 20,
    },
    checkboxTitle: {
        fontFamily: 'Roboto-Thin'
    }
 });