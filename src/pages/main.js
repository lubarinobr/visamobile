import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Card } from 'react-native-elements';

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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Card
                    image={require('../images/passaporte.png')}>
                    <Text>Tipo visto: {this.state.visaType}</Text>
                    <Text style={{marginBottom: 10}}>
                        Status: {this.state.status}
                    </Text>
                </Card>
            </View>
        );
    }

}

Main.navigationOptions = {
    title: "Home",
    tabBarIcon: <Icon name="home" size={18} color="#999" />
}