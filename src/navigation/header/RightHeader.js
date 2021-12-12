import * as React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes';
import Icon from "../../helpers/Icons";
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
const RightHeader = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.push('Drawer', { screen: 'Notification' })
            }
        >
            <Icon.Ionicons name="md-notifications" color={Colors.themeColor} size={28} />
        </TouchableOpacity >
    )

}
export default RightHeader