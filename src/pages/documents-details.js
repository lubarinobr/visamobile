import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements';

export default class DocumentsDetail extends Component {

    state = {
        name: "",
        description: ""
    }

    componentDidMount() {
        const { navigation } = this.props;
        const name = navigation.getParam("name");
        const description = navigation.getParam("description");

        this.setState({name, description});
    }

    render() {
        return (
            <View>
                <Card>
                    <Text style={{paddingBottom: 10}}>{this.state.name}</Text>
                    <Divider style={{backgroundColor: 'gray'}}/>
                    <Text style={{paddingTop: 10}}>{this.state.description}</Text>
                </Card>
            </View>
        );
    }

}

DocumentsDetail.navigationOptions = {
    title: "Informações sobre o Documento"
}