import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main from './pages/main';
import Documents from './pages/documents';
import Config from './pages/config';
import DocumentsDetail from './pages/documents-details';

const app = createBottomTabNavigator({
    Config,
    Home: Main,
    Documents,
}, {
    tabBarOptions: {
        activeTintColor: "#FFF",
        activeBackgroundColor: "#1a73e8",
        inactiveBackgroundColor: "#1a73e8",
        borderTopColor: 'transparent',
    },
    borderTopColor: 'transparent'
});

const stackApp = createStackNavigator({
    DocumentsDetail
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