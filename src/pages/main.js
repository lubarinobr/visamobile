import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Avatar } from 'react-native-elements';
import Notification from '../services/notification';
import firebase from 'react-native-firebase';

export default class Main extends Component {

    state = {
        status: "",
        currentUser: null,
    }

    componentDidMount() {
        this.loadUser();
    }

    componentWillUnmount() {
        this.loadUser();
        this.loadNotification();
    }

    loadNotification = async () => {
        new Notification().init();
    }

    logout = async () => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('Loading');
        }catch ( erro ) {
            console.log(error.message);
        }
    }

    loadUser = async () => {
        try{
            const { currentUser } = await firebase.auth();
            const resultUser = await api.get(`/visas/user?email=${currentUser.email}`) 
            const {user: {name}, status } = resultUser.data;
            
            this.setState({ name, status, currentUser});
    
            this.loadNotification();

        }catch( error ) {
            console.log(error);
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={style.container}>
                <View style={style.profile}>
                    <Avatar
                        rounded
                        size='medium'
                        title='PT'

                    />
                    <Text style={style.profileName}>Olá {this.state.name}</Text>
                </View>
                <View style={style.welcome}>
                    <Text style={style.welcomeTitle}>Veja abaixo como anda o status do seu visto.</Text>
                </View>
                <View style={style.options}>
                    <ImageBackground
                        borderRadius={8}
                        resizeMethod='auto'
                        imageStyle={{opacity: 0.8}}
                        source={require('../images/bandeira-portugal.jpg')}
                        style={{width: '100%', height:'100%'}}
                    >
                    <Text style={style.optionsStatus}>Status: {this.state.status}</Text> 
                    </ImageBackground>
                </View>

                <View style={style.logouButtom}>
                    <Button
                        onPress={this.logout}
                        title="Sair"
                    />
                </View>
            </View>
        );

    }

}

Main.navigationOptions = {
    title: "Home",
    tabBarIcon: <Icon name="home" size={25} color="#FFF" />
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: '#FFF',
        
    },
    profile: {
        marginTop: 20,
        marginLeft: 20,
    },
    profileName: {
        color: '#1a73e8',
        fontFamily: 'Roboto-Thin',
        marginTop: 5,
        fontSize: 20,
    },
    welcomeTitle: {
        color: '#1a73e8',
        fontFamily: 'Roboto-Black',
        fontSize: 30,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        
    },
    options: {
        alignSelf: 'center',
        marginTop: 30,
        width: 250,
        height: 250,
    },
    optionsStatus: {
        color:'white',
        fontFamily: 'Roboto-Black',
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        left: 10,
    },
    optionsBorder: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#1a73e8',
        borderWidth: 2,
        width: 250,
        alignSelf: 'center',
    },
    logouButtom: {
        marginTop: 10,
        alignItems: 'center'
    },
})