import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input , Divider, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Visa extends Component {

    state = {
        username : null,
        password : null,
        usernameErrorMessage: '',
        passwordErrorMessage: '',
    }

    submitVisa = () => {
        this.setState({usernameErrorMessage: '', passwordErrorMessage: ''});
        
        if(!this.state.username || !this.state.username.trim()) {
            this.setState({usernameErrorMessage: "Você precisa inserir o usuário"});
            return;
        }

        if(!this.state.password) {
            this.setState({passwordErrorMessage: "Você precisa inserir a senha do usuário"});
            return;
        }
    }
    
    render() {
        return (
            <View style={styles.container}>

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
                        secureTextEntry={true}
                        shake={true}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.passwordErrorMessage}
                        onChangeText={username => this.setState({username})}
                        rightIcon={
                            <Icon 
                                name="lock"
                                size={24}
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