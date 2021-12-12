import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/Login';
import Order from '../../screens/Orders';
import DrawerNavigator from '../drawer'
import MiddleHeader from '../header/MiddleHeader';
import LeftHeader from '../header/LeftHeader';
import RightHeader from '../header/RightHeader';


StatusBar.setTranslucent(false);
StatusBar.setBackgroundColor('#5F63D6');
StatusBar.setHidden(false)
const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (

        <Stack.Navigator options={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
           
        </Stack.Navigator>

    );
}

export default StackNavigator;