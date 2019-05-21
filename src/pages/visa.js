import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Input , Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import Loader from '../components/loader';

export default class Visa extends Component {

    state = {
        username : null,
        password : null,
        userId: null,
        usernameErrorMessage: '',
        passwordErrorMessage: '',
        loading: false,
        security: true,
    }

    componentDidMount() {
        let userId = this.props.navigation.getParam('userId');
        this.setState({userId});
    }

    submitVisa = async () => {
        this.setState({usernameErrorMessage: '', passwordErrorMessage: '', loading: true, security: true});

        if(!this.state.username || !this.state.username.trim()) {
            this.setState({usernameErrorMessage: "Você precisa inserir o usuário"});
            return;
        }

        if(!this.state.password) {
            this.setState({passwordErrorMessage: "Você precisa inserir a senha do usuário"});
            return;
        }
        
        try{
            await api.post(`visas/user/${this.state.userId}`, {username : this.state.username, password: this.state.password});
            this.props.navigation.navigate('Main');
        }catch(error) {
            Alert.alert("Aviso", "Ocorreu um erro ao tentar salvar o seu visto, tente novamente");
        }

        this.setState({loading: false});

    }
    
    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <View style={styles.welcomeView}>
                    <Text style={styles.visaWelcomeTitle}>Insira os dados de acesso do seu visto aqui.</Text>
                </View>
                <Divider style={{backgroundColor: '#1a73e8', marginTop: 10}} />
                <View style={styles.visaForm}>
                    <Input
                        autoCapitalize="none"
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
                        placeholder="senha"
                        secureTextEntry={this.state.security}
                        shake={true}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordErrorMessage}
                        onChangeText={password => this.setState({password})}
                        rightIcon={
                            <Icon 
                                name="lock"
                                size={24}
                                onPress={() => this.setState({security: !this.state.security})}
                            />
                        }
                    />

                    <Button 
                        containerStyle={{ margin: 20}}
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
                </View>
            </View>

        );
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