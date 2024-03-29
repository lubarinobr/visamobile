import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';


export default class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main': 'Login', {props: this.props});
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textLoad}>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoad: {
        fontFamily: 'Roboto-Black',
        fontSize: 15,
    },
});