import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../screens/Home'
import Order from '../../screens/Orders'
const Drawer = createDrawerNavigator();
import LeftHeader from '../header/LeftHeader';
import RightHeader from '../header/RightHeader';
import MiddleHeader from '../header/MiddleHeader';
import Detail from '../../screens/Detail';

function DrawerNavigator(props) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen   name="Home" component={Home} options={{
                headerShadowVisible:false,
                headerTitle: (props) => MiddleHeader("Home"),
                headerLeft: (props) => LeftHeader("Home"),
                headerRight: (props) => RightHeader("Home"),
            }} />
           
           <Drawer.Screen name="Order" component={Order} options={{
                headerTitle: (props) => MiddleHeader("Order"),
                headerLeft: (props) => LeftHeader("Order"),
                headerRight: (props) => RightHeader("Order"),
            }} />
            <Drawer.Screen name="Detail" component={Detail} options={{
                 headerShadowVisible:false,
                headerTitle: (props) => MiddleHeader("Detail"),
                headerLeft: (props) => LeftHeader("Detail"),
                headerRight: (props) => RightHeader("Detail"),
            }} />
        </ Drawer.Navigator>
    );
}

export default DrawerNavigator;