import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import api from '../services/api';

export default class Notification {

    init = async (isClean = false) => {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getToken(isClean);
        }else {
            this.requestPermission();
        }
    }

    getToken = async (isClean) => {
        
        let fcmToken = null;
        if(!isClean) {
            let fcmToken = await AsyncStorage.getItem('fcmToken');
        }
        
        if(!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                const { currentUser: {email} } = firebase.auth();
                let user = {email, messageToken: fcmToken}
                await api.put(`/users?email=${email}`, user);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();

            this.getToken();
        }catch( error ) {
            console.log(error);
        }
    }

    saveToken = async () => {
        
    }
}