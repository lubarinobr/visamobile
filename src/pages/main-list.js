import React , { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Transition } from 'react-navigation-fluid-transitions';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getUserByEmail } from '../services/userService';
import firebase from 'react-native-firebase';
import InfoRow from '../components/InfoRow';


export default class MainList extends Component {

    state = {
      user : {}
    }

    componentDidMount() {
      this.getUser();
    }

    getUser = async () => {
      const { currentUser } = await firebase.auth();
      let user = await getUserByEmail(currentUser.email);
      this.setState({user});
      console.log(this.state.user)
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => {
      return <InfoRow title={item.owner} 
                description={item.lastStatus} 
                icon="account-badge-outline" 
                navigator={() => this.props.navigation.navigate('Main')}/>
    }

    render() {
        return(
            <Transition appear="top" disappear="bottom">
            <View style={style.container}>
                <View style={style.header}>
                <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 20, color: 'white', fontFamily: 'Roboto-Medium'}}>Consulta de visto</Text>
                <TextInput  autoCapiaroundtalize="none" 
                                autoCorrect={false} 
                                keyboardType='email-address' 
                                returnKeyType="next"
                                placeholder='Nome ou Passaporte' 
                                placeholderTextColor='rgba(225,225,225,1)'
                                style={{backgroundColor: 'white', marginHorizontal: 30, borderRadius: 10, marginTop: 20}}
                                />

                </View>
                
                    <ScrollView style={style.list} showsVerticalScrollIndicator={false}>
                    <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={this.state.user.visa}
                        renderItem={this.renderItem}
                      />
                    </ScrollView>
            </View>
            </Transition>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 150,
        backgroundColor: '#1a73e8'
    },
    list: {
        marginTop: 10,
        marginHorizontal: 5
    }
});