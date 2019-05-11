import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main from './pages/main';
import Documents from './pages/documents';
import Config from './pages/config';
import DocumentsDetail from './pages/documents-details';

const app = createBottomTabNavigator({
    Home: Main,
    Documents,
    Config
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