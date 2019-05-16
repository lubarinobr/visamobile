import React , { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Visa extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Novo Visa</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 20
    }
});