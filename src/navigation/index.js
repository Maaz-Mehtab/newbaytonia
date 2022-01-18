import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NotificationsHelper from '../helpers/NotificationHelper';
import StackNavigator from './stack'
import { Provider } from 'react-redux';
import {
    store,
    persistor
} from '../store'
import {
    PersistGate
} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message'
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// let notif = NotificationsHelper.initializeFCM();
// console.log("notif", notif);
function App() {

    SplashScreen.hide();
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer>
                    <StackNavigator />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export default App;

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <NavigationContainer>
//                 <StackNavigator />
//             </NavigationContainer>
//         )
//     }
// }