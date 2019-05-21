import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { Input , Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import Loader from '../components/loader';

export default class VisaEdit extends Component {

    state = {
        username : null,
        password : null,
        userId: null,
        usernameErrorMessage: '',
        passwordErrorMessage: '',
        visaId: null,
        isLogin: false,
        loading: false,
        security: true,
    }

    componentDidMount() {
        let userId = this.props.navigation.getParam('userId');
        let username = this.props.navigation.getParam('username');
        let password = this.props.navigation.getParam('password');
        let visaId = this.props.navigation.getParam('visaId');  
        this.setState({userId, username, password, visaId});
    }

    editVisa = async () => {

        this.setState({usernameErrorMessage: '', passwordErrorMessage: '', loading: true, security: true});

        if(!this.state.username || !this.state.username.trim()) {
            this.setState({usernameErrorMessage: "Você precisa inserir o usuário"});
            this.setState({loading: false});
            return;
        }

        if(!this.state.password) {
            this.setState({passwordErrorMessage: "Você precisa inserir a senha do usuário"});
            this.setState({loading: false});
            return;
        }
        
        try{
            await api.put(`/visas/${this.state.visaId}`, {username : this.state.username, password: this.state.password});
        }catch(error) {
            console.log(error);
        }

        this.setState({loading: false});
        Alert.alert("Sucesso", "Seu visto foi atualizado com sucesso");
    }

    deleteVisa = async () => {
        this.setState({loading: true});
        try{
            this.setState({isLogin: true});
            await api.delete(`/visas/${this.state.visaId}`);
            this.props.navigation.navigate('Main');
            
        }catch(error) { 
            console.log(error);
        };

        this.setState({loading: false});
    }

    render(){
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}> 
                        <Button 
                            containerStyle={{ width: 150}}
                            title="Salvar"
                            iconRight
                            onPress={() => this.editVisa()}
                            icon={
                                <Icon 
                                    name="check-circle"
                                    size={15}
                                    color="white"
                                />
                            }
                        />
                        <ActivityIndicator size="large" style={styles.spinner} color='red' animating={this.state.isLogin} hidesWhenStopped={false} />
                        <Button 
                            containerStyle={{width: 150}}
                            buttonStyle={{backgroundColor: '#FB6567'}}
                            title= "Excluir"
                            iconRight
                            onPress={() => this.deleteVisa()}
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
        fontFamily: 'Roboto-Thin',
    },
    spinner: {
        height: 10,
    },
 });