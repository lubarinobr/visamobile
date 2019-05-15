import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-elements';

export default class DocumentsDetail extends Component {

    state = {
        name: "",
        description: ""
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log(navigation.getParam("name"));
        const name = navigation.getParam("name");
        const description = navigation.getParam("description");

        this.setState({name, description});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.documentTitle}>{this.state.name}</Text>
                    <Divider style={{backgroundColor: 'gray'}}/>
                    <Text style={styles.documentDetail}>{this.state.description}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    documentTitle: {
        fontFamily: 'Roboto-Black',
        fontSize: 25,
        color: '#1a73e8'
    },
    documentDetail: {
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        textAlign: 'justify'
    },
    card: {
        display: 'flex',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 20,
        borderColor: '#1a73e8',
        borderWidth: 2,
    },
});

DocumentsDetail.navigationOptions = {
    headerMode: 'none'
}