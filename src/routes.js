import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import Loading from './pages/loading';
import Signup from './pages/signup';
import Main from './pages/main';
import Documents from './pages/documents';
import Config from './pages/config';
import DocumentsDetail from './pages/documents-details';
import Visa from './pages/visa';
import VisaEdit from './pages/visa-edit';
import Login from './pages/login';
import MainList from './pages/main-list';

const app = createBottomTabNavigator({
    Main,
    Documents,
    Config,
}, {
    tabBarOptions: {
        activeTintColor: "#FFF",
        activeBackgroundColor: "#1a73e8",
        inactiveBackgroundColor: "#1a73e8",
    },
});

const visaScreen = FluidNavigator({
    MainList,
    Main
})

const stackApp = createStackNavigator({
    visaScreen,
    Documents,
    Config,
    Visa,
    DocumentsDetail,
    VisaEdit,
    Signup,
}, {
    headerMode: 'none'
});

const auth = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        }
    }

});

const Routes = createAppContainer(
    createSwitchNavigator({
        Loading,
        auth,
        stackApp
    }, {
        headerMode: 'none',
        initialRouteName: 'Loading'
    })
);

export default Routes;