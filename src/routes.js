import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Loading from './pages/loading';
import SignUp from './pages/signup';
import Login from './pages/login';
import Main from './pages/main';
import Documents from './pages/documents';
import Config from './pages/config';
import DocumentsDetail from './pages/documents-details';

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

const stackApp = createStackNavigator({
    DocumentsDetail
}, {
    headerMode: 'none'
});

const auth = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },
    Login,
});

const Routes = createAppContainer(
    createSwitchNavigator({
        Loading,
        auth,
        app,
        stackApp
    }, {
        headerMode: 'none',
        initialRouteName: 'Loading'
    })
);

export default Routes;