import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import NotificationsHelper from '../helpers/NotificationHelper';
import StackNavigator from './stack'



// let firebaseToken = NotificationsHelper.getToken();
// let notif = NotificationsHelper.initializeFCM();
// console.log("firebaseToken", firebaseToken);
// console.log("notif", notif);
function App() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
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