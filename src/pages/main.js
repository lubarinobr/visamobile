import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Card, Button, Overlay } from 'react-native-elements';
import Notification from '../services/notification';

export default class Main extends Component {

    state = {
        visaType: "",
        status: "",
        isVisible: false
    }

    componentDidMount() {
        this.loadNotification();
        this.loadUser();
    }

    componentWillUnmount() {
        this.loadNotification();
        this.loadUser();
    }

    loadNotification = async () => {
        new Notification().init();
    }

    loadUser = async () => {
        const resultUser = await api.get("/visas/user?email=matheus.lubarino1@gmail.com") 
        const {visaType: {name}, status } = resultUser.data;
        
        this.setState({ visaType: name, status: status});
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
            <View style={{flex:1}}> 
                <Card
                    imageStyle={{height:200, width:320}}
                    image={require('../images/bandeira-portugal.jpg')}
                    featuredTitle="Visto Português"
                    featuredTitleStyle={style.title}
                    featuredSubtitleStyle={style.subtitle}
                    featuredSubtitle={this.getStatus()}
                    >
                </Card>

                <Button
                    icon={
                        <Icon
                        name="book" 
                        size={15}
                        color="white"
                        />
                        
                    }
                    containerStyle={{padding: 10}}
                    iconRight
                    title="Inserir visto "
                    onPress={() => this.enterNewVisa()}
                    />
                    {this.renderOverlay()} 
            </View>
        );

    }

}

Main.navigationOptions = {
    title: "Home",
    tabBarIcon: <Icon name="home" size={18} color="#999" />
}

const style = StyleSheet.create({
    title: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:25
    },
    subtitle: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:20,
    }
})