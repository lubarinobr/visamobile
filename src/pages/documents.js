import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { CheckBox, Divider } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class Documents extends Component {

    state = {
        checklist: [],
        currentUser: null,
    }

    componentDidMount() {
        this.loadUserCheckList();
    }

    loadUserCheckList = async () => {
        const { currentUser } = firebase.auth();
        const result = await api.get(`/users?email=${currentUser.email}`);
        const { checklist } = result.data;

        this.setState({checklist});
    }

    changeCheckListChecked = async (index) => {
        const checks = this.state.checklist;
        checks[index].checked = !checks[index].checked;

        this.updateCheckList(checks[index].id)
        this.setState({checklist: checks});
    }

    showDescription = (check) => {
        const { name, description, id } = check;
        this.props.navigation.navigate('DocumentsDetail', { name: name , description: description });
    }

    updateCheckList = async (id) => {
        const result = await api.put(`/users/checklist/${id}`);
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.welcomeView}>
                    <Text style={styles.documentWelcomeTitle}>Aqui você pode marcar os documetos que já tem em mãos.</Text>
                </View>
                <Divider style={{backgroundColor: '#1a73e8', marginTop: 10}} />
                <View style={styles.listDocument}>
                {
                    this.state.checklist.map((check, i) => (
                        <CheckBox
                        key={i}
                        textStyle={styles.checkboxTitle}
                        title={check.name}
                        checked={check.checked}
                        onPress={() => this.changeCheckListChecked(i)}
                        onLongPress={() => this.showDescription(check)}
                        />
                    ))
                }
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white',
   } ,
   welcomeView: {
    margin: 10,
    alignItems: 'center'
   },
   documentWelcomeTitle: {
    fontFamily: 'Roboto-Black',
    fontSize:20,
    color: '#1a73e8'
   },
   listDocument: {
        marginTop: 20,
   },
   checkboxTitle: {
       fontFamily: 'Roboto-Thin'
   }
});

Documents.navigationOptions = {
    title: "Documentos",
    tabBarIcon: <Icon name="file-document-box-outline" size={25} color="#FFF" />
}