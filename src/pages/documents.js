import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import { CheckBox } from 'react-native-elements'

export default class Documents extends Component {

    state = {
        checklist: []
    }

    componentDidMount() {
        this.loadUserCheckList();
    }

    loadUserCheckList = async () => {
        const result = await api.get("/users?email=matheus.lubarino1@gmail.com");

        const { checklist } = result.data;

        this.setState({checklist});
    }

    changeCheckListChecked = async (index) => {
        const checks = this.state.checklist;
        checks[index].checked = !checks[index].checked;

        this.setState({checklist: checks});
    }

    showDescription = (check) => {
        const { name, description } = check;
        this.props.navigation.navigate('DocumentsDetail', { name: name , description: description });
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
    tabBarIcon: <Icon name="file-document-box-outline" size={18} color="#999" />
}