import * as React from 'react';
import { View, Button, TouchableOpacity,Text } from 'react-native';
import { Colors } from '../../themes';
// import Text from '../../components/Text';
const MiddleHeader = (props) => {
    if(props=="Home"){
        return null
        
    }
    else
    return (
        <Text style={{color:Colors.themeColor,fontSize:16,fontWeight:'bold'}} >{props}</Text>
    )
}
export default MiddleHeader