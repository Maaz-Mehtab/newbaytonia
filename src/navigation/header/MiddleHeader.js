import * as React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes';
import Text from '../../components/Text';
const MiddleHeader = (props) => {
    return (
        <Text size={"large"}>{props}</Text>
    )
}
export default MiddleHeader