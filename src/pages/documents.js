import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

export default class Documents extends Component {

    state = {
        checklist: []
    }

    componentDidMount() {
        this.loadUserCheckList();
    }

    loadUserCheckList = async () => {
        let email = AsyncStorage.getItem("email");
        if(!email) {
            this.props.navigation.navigate("Config");
        }

        const result = await api.get(`/users?email=${email}`);

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
            <View style={{padding: 10}}>
                {
                    this.state.checklist.map((check, i) => (
                        <CheckBox
                        key={i}
                        title={check.name}
                        checked={check.checked}
                        onPress={() => this.changeCheckListChecked(i)}
                        onLongPress={() => this.showDescription(check)}
                        />
                    ))
                }
            </View>

        );
    }
}

Documents.navigationOptions = {
    title: "Documentos",
    tabBarIcon: <Icon name="file-document-box-outline" size={25} color="#999" />
}