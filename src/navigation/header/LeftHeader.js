import * as React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import Icon from "../../helpers/Icons";
import { Colors } from '../../themes';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
const LeftHeader = (props) => {
    const navigation = useNavigation();
    if (props == "Home") {
        return (
            <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => console.log("navigation",navigation.openDrawer())}
            >
                <Icon.Ionicons name="menu" color={Colors.themeColor} size={28} />
            </TouchableOpacity>
        )
    }
    else {
        return (
           
            <Icon.Ionicons name="arrow-back" style={{ marginLeft: 0,marginRight:20 }} onPress={() => navigation.goBack(-1)} color={Colors.themeColor} size={28} />
        )
    }
}
export default LeftHeader