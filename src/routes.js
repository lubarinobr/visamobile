import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main from './pages/main';
import Documents from './pages/documents';
import Config from './pages/config';
import DocumentsDetail from './pages/documents-details';

const app = createBottomTabNavigator({
    Home: Main,
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

const Routes = createAppContainer(
    createStackNavigator({
        app,
        stackApp
    }, {
        headerMode: 'none'
    })
);

export default Routes;