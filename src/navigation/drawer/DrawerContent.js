import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { store } from '../../store'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from '@react-navigation/native';
import { Colors, Metrics } from '../../themes';
import { Switch } from 'react-native-paper';
import userAction from '../../store/action/user';
function DrawerContent(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const { userdata } = useSelector(state => state.AuthReducers)
 
   logoutUser = ()=>{
        
        dispatch(userAction.logout())
        navigation.navigate('Login', { screen: 'Login' })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                alignItems: 'center',
                width: '100%', backgroundColor: Colors.themeColor, height: Metrics.ratio(200),
                marginTop: -50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingHorizontal: Metrics.ratio(20)
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>

                    <FontAwesome name="user-circle" size={50} style={{}} color={Colors.white} />
                    <View style={{ flexDirection: 'column', }}>
                        <Text style={{ paddingLeft: 15, fontSize: Metrics.ratio(16), color: Colors.white }}>{userdata.deliveryBoyName}</Text>
                        <Text style={{ paddingLeft: 15, fontSize: Metrics.ratio(16), color: Colors.white }}>{userdata.deliveryBoyEmail}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.drawerContent}>

                <TouchableOpacity onPress={() => console.log("navigation", navigation)}
                    style={{ borderBottomColor: Colors.placeholderColor, borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FontAwesome name="th-large" size={20} style={{}} color={Colors.text} />
                        <Text style={{ paddingLeft: 15, fontSize: 16 }}>Dashboard</Text>
                    </View>
                    <View>
                        <Entypo name="chevron-right" size={20} style={{}} color={Colors.text} />
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        borderBottomColor: Colors.placeholderColor,
                        borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 40,
                        justifyContent: 'space-between', alignItems: 'center', height: 50
                    }}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}> */}
                    {/* <FontAwesome name="language" size={20} style={{}} color={Colors.text} /> */}


                    {/* <View style={{flexDirection:'row'}}> */}
                    <Text>Arabic</Text>
                    <Switch color={Colors.themeColor} value={isSwitchOn} onValueChange={onToggleSwitch} />
                    <Text>English</Text>
                    {/* <Entypo name="chevron-right" size={20} style={{}} color={Colors.text} /> */}
                    {/* </View> */}
                    {/* </View> */}
                </View>


                <TouchableOpacity onPress={() => logoutUser()}
                    style={{ borderBottomColor: Colors.placeholderColor, borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Entypo name="log-out" size={20} style={{}} color={Colors.text} />
                        <Text style={{ paddingLeft: 15, fontSize: 16 }}>Logout</Text>
                    </View>
                    <View>
                        {/* <Entypo name="chevron-right" size={20} style={{}} color={Colors.text} /> */}
                    </View>
                </TouchableOpacity>




            </View>

        </SafeAreaView>
    );
}
export default DrawerContent
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});