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
                onPress={() => alert('This is a button!')}
            >
                <Icon.Ionicons name="menu" color={Colors.themeColor} size={28} />
            </TouchableOpacity>
        )
    }
    else {
        return (
            <Icon.Ionicons name="arrow-back" style={{ marginLeft: 20 }} onPress={() => navigation.goBack()} color={Colors.themeColor} size={28} />
        )
    }
}
export default LeftHeader