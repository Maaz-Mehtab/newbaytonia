import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/Login';
import Signup from '../../screens/Signup';
import Order from '../../screens/Orders';
import DrawerNavigator from '../drawer'
import MiddleHeader from '../header/MiddleHeader';
import LeftHeader from '../header/LeftHeader';
import RightHeader from '../header/RightHeader';
import { Colors } from '../../themes';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../../screens/Home';
import Detail from '../../screens/Detail';

StatusBar.setTranslucent(false);
StatusBar.setBackgroundColor(Colors.themeColor);
StatusBar.setHidden(false)
const Stack = createNativeStackNavigator();

function StackNavigator() {
    const { login } = useSelector(a => a.AuthReducers);
    return (
        <Stack.Navigator initialRouteName={login == "" ? "Login" : "Drawer"} options={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{
                headerShadowVisible: false,
                
                headerTitle: (props) => MiddleHeader("Home"),
                headerLeft: (props) => LeftHeader("Home"),
                headerRight: (props) => RightHeader("Home"),
            }} />
            <Stack.Screen name="Order" component={Order} options={{
                headerBackVisible:false,
                
                headerTitle: props => MiddleHeader("Order"),
                headerLeft: (props) => LeftHeader("Order"),
                headerRight: (props) => RightHeader("Order"),
            }} />
            <Stack.Screen name="Detail" component={Detail} options={{
                headerShadowVisible: false,
                headerBackVisible:false,
                headerTitle: (props) => MiddleHeader("Detail"),
                headerLeft: (props) => LeftHeader("Detail"),
                headerRight: (props) => RightHeader("Detail"),
            }} />
        </Stack.Navigator>

    );
}

export default StackNavigator;