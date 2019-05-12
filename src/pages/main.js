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

    getStatus = () => {
        return `Status: ${this.state.status}`;
    }

    enterNewVisa = () => {
        console.log("Chamou overlay")
        this.setState({isVisible: true});
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
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20, color: 'white'}}>Visa Mobile</Text>
                </View>
                <View> 
                    <Card
                        containerStyle={style.card}
                        imageStyle={{height:200, width:320}}
                        image={require('../images/bandeira-portugal.jpg')}
                        featuredTitle="Visto Português"
                        featuredTitleStyle={style.title}
                        featuredSubtitleStyle={style.subtitle}
                        featuredSubtitle={this.getStatus()}
                        >
                    </Card>
                </View>
                {this.renderOverlay()} 
            </View>
        );

    }

}

Main.navigationOptions = {
    title: "Home",
    tabBarIcon: <Icon name="home" size={25} color="#999" />
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
        width: 200, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    title: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:25,
        fontFamily: 'Roboto'
    },
    subtitle: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:20,
    },
})