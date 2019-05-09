import { createAppContainer , createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main from './pages/main';
import Documents from './pages/documents';
import DocumentsDetail from './pages/documents-details';

const app = createBottomTabNavigator({
    Home: Main,
    Documents
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