import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Card, Button, Overlay } from 'react-native-elements';
import Notification from '../services/notification';
import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component {

    state = {
        visaType: "",
        status: "",
        isVisible: false
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

    loadUser = async () => {
        let email = await AsyncStorage.getItem("email");
        if(!email) {
            this.props.navigation.navigate("Config");
        }else {
            const resultUser = await api.get(`/visas/user?email=${email}`) 
            const {visaType: {name}, status } = resultUser.data;
            
            this.setState({ visaType: name, status: status});

            this.loadNotification();

        }
    }

    renderOverlay = () => {
        return (
            <View style={style.overlay}>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(255, 255, 255, .8)"  
                    overlayBackgroundColor="red"
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    width="auto"
                    height="auto"
                    >
                    <Text>Hello from Overlay!</Text>
                </Overlay>
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.header}>Visa Mobile</Text>
                </View>
                <View style={style.card}>
                    <Text style={style.cardTitle}>Visto Português</Text>
                    <View style={style.cardStatus}>
                        <Text style={style.cardTitleStatus}>Status:</Text>
                        <Text style={style.cardDescriptionStatus}> {this.state.status}</Text>
                    </View>
                </View>
                {this.renderOverlay()} 
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
        flexDirection: 'column', 
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#1a73e8',
        justifyContent: 'space-around'
        
    },
    header: { 
        fontFamily: 'Roboto-Regular', 
        fontSize: 25, 
        color: 'white',
    },
    title: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:50,
        fontFamily: 'Roboto'
    },
    subtitle: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:20,
    },
    card: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 20,
        flexDirection: 'row'
    },
    cardTitle: {
        marginTop: 30,
        fontFamily: 'Roboto',
        fontSize: 25,
    },
    cardStatus: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    cardTitleStatus: {
        fontFamily: 'Roboto',
        fontSize: 20,
    },
    cardDescriptionStatus: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: 'green'
    }

})