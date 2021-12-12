import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home'
import Order from '../../screens/Orders'
const Drawer = createDrawerNavigator();
import LeftHeader from '../header/LeftHeader';
import RightHeader from '../header/RightHeader';
import MiddleHeader from '../header/MiddleHeader';

function DrawerNavigator(props) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{
                headerTitle: (props) => MiddleHeader("Home"),
                headerLeft: (props) => LeftHeader("Home"),
                headerRight: (props) => RightHeader("Home"),
            }} />
           
           <Drawer.Screen name="Order" component={Order} options={{
                headerTitle: (props) => MiddleHeader("Order"),
                headerLeft: (props) => LeftHeader("Order"),
                headerRight: (props) => RightHeader("Order"),
            }} />
        </ Drawer.Navigator>
    );
}

export default DrawerNavigator;