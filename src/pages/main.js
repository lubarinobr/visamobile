import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Card, Image } from 'react-native-elements';

export default class Main extends Component {

    state = {
        visaType: "",
        status: ""
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = async () => {
        const resultUser = await api.get("/visas/user?email=matheus.lubarino1@gmail.com") 
        const {visaType: {name}, status } = resultUser.data;
        
        this.setState({ visaType: name, status: status});
    }

    getStatus = () => {
        return `Status: ${this.state.status}`;
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Card
                    wrapperStyle={{flex: 1}}
                    imageStyle={{height:200, width:320}}
                    image={require('../images/bandeira-portugal.jpg')}
                    featuredTitle="Visto Português"
                    featuredTitleStyle={style.title}
                    featuredSubtitleStyle={style.subtitle}
                    featuredSubtitle={this.getStatus()}
                    >
                </Card>
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
        // flex: 1,
        // justifyContent: 'flex-start',
        // alignSelf: 'flex-start'
        alignSelf: 'flex-start',
        paddingLeft: 10,
        textShadowOffset: { width: 20, height: 220 },
        textShadowRadius: 20,
        textShadowColor: '#000',
        fontSize:25
    },
    subtitle: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        fontSize:20,
    }
})