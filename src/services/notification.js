import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import api from '../services/api';

export default class Notification {

    async init() {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getToken();
        }else {
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
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

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();

            this.getToken();
        }catch( error ) {
            console.log(error);
        }
    }
}