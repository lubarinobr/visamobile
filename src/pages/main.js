import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, ScrollView , TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import { Avatar } from 'react-native-elements';
import Notification from '../services/notification';
import firebase from 'react-native-firebase';
import Loader from '../components/loader'
import { Transition } from 'react-navigation-fluid-transitions';


export default class Main extends Component {

    state = {
        status: "", 
        currentUser: null,
        name: null,
        userId: null,
        username: "",
        password: "",
        visaId: "",
        loading: false,

    }

    // pageFocus = this.props.navigation.addListener(
    //     // 'didFocus',
    //     // payload => {
    //     //     this.loadUser();
    //     // }
    // );

    componentDidMount() {
        this.loadNotification();
        this.loadUser();
    }

    // componentWillUnmount() {
    //     this.pageFocus.remove();
    // }
    
    loadUser = async () => {
        this.setState({loading: true, status: '', visaId: ""});
        try{
            const { currentUser } = await firebase.auth();
            if(this.state.name == null) {
                this.setState({name: currentUser.displayName});
            } 
            const resultUser = await api.get(`/users?email=${currentUser.email}`)
            const {id ,name } = resultUser.data;
            
            if(resultUser.data.visa) {
                const {visa: {id, username, password, status}} = resultUser.data;

                this.setState({visaId: id, username, password, status});
            }

            if(!resultUser.data.messageToken) {
                this.loadNotification();
            }
            
            this.setState({ userId: id, name, currentUser});
    
            this.loadNotification(true);

        }catch( error ) {
            console.log(error);
        }

        this.setState({loading: false});
    }

    loadNotification = async (isClear = false) => {
        new Notification().init(isClear);
    }

    openPage = (page, param = {}) => {
        this.props.navigation.navigate(page, param);
    }

    isDisable = () => {
        return !this.state.visaId;
    }

    render() {
        return (
            <Transition appear="top" delay>
            <View style={style.container}>
                <Loader
                    loading={this.state.loading} />
                <View style={style.profile}>
                    <Avatar
                        rounded
                        size='medium'
                        title='PT'

                    />
                    <Text style={style.profileName}>Olá {this.state.name}</Text>
                </View>
                <View style={style.welcome}>
                    <Text style={style.welcomeTitle}>Veja abaixo como anda o status do seu visto.</Text>
                </View> 

                <View style={style.options}>
                    <ImageBackground
                        borderRadius={8}
                        resizeMethod='auto' 
                        imageStyle={{opacity: 0.8}}
                        source={require('../images/bandeira-portugal.jpg')}
                        style={{width: '100%', height:'100%'}}
                    >
                    <Text style={style.optionsStatus}>Status: {this.state.status}</Text> 
                    </ImageBackground>
                </View>

                <ScrollView horizontal={true} contentContainerStyle={style.menuContainer} showsHorizontalScrollIndicator={false}>
                    
                    {this.state.visaId
                        ? <TouchableOpacity onPress={() => this.openPage('VisaEdit', {userId: this.state.userId, username: this.state.username, password: this.state.password, visaId: this.state.visaId})}>
                        <View style={style.menu}>
                            <Icon name="assignment" size={24} color="#FFF" />
                            <Text style={style.menuText}>Editar visto</Text>
                        </View>
                        </TouchableOpacity>

                        :
                        
                        <TouchableOpacity onPress={() => this.openPage('Visa', {userId: this.state.userId})}>
                        <View style={style.menu}>
                            <Icon name="assignment" size={24} color="#FFF" />
                            <Text style={style.menuText}>Novo visto</Text>
                        </View>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => this.openPage('Documents')} disabled={this.isDisable()}>
                    <View style={style.menu}>
                        <Icon name="book" size={24} color="#FFF" />
                        <Text style={style.menuText}>Meus Documentos</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert("Em construção", "Em breve você terá diversas dicas.")}> 
                    <View style={style.menu}>
                        <Icon name="info" size={24} color="#FFF" />
                        <Text style={style.menuText}>Dicas</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openPage('Config')}>
                    <View style={style.menu}>
                        <Icon name="settings" size={24} color="#FFF" />
                        <Text style={style.menuText}>Configurações</Text>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </Transition>
        );

    }

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: '#FFF',
        
    },
    profile: {
        marginTop: 20,
        marginLeft: 20,
    },
    profileName: {
        color: '#1a73e8',
        fontFamily: 'Roboto-Thin',
        marginTop: 5,
        fontSize: 20,
    },
    welcomeTitle: {
        color: '#1a73e8',
        fontFamily: 'Roboto-Black',
        fontSize: 30,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        
    },
    options: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        height: 250,
    },
    optionsStatus: {
        color:'white',
        fontFamily: 'Roboto-Black',
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        left: 10,
    },
    optionsBorder: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#1a73e8',
        borderWidth: 2,
        width: 250,
        alignSelf: 'center',
    },
    menuContainer: {
        paddingLeft: 10, 
        paddingRight: 20,
        paddingTop: 20
    },
    menu: {
        width: 100,
        height: 100,
        backgroundColor: '#1a73e8',
        borderRadius: 8,
        marginLeft: 10,
        padding: 10,
        justifyContent: 'space-between',
    },
    menuText: {
        fontSize: 13,
        color: '#FFF',
    },
    
})