import * as React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import { Colors } from '../../themes';
import styles from './styles';
function Home(props) {
    return (
        <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 50 }}>
                    <View style={styles.mainView}>
                        <Text size={'xLarge2'} type={"heading"}>Your Documents</Text>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("RFQ")} style={[styles.boxView, {
                        borderColor: Colors.borderColor,
                        borderWidth: 1,
                    }]}>
                        <View>
                            <Text size={'medium'} style={{ color: Colors.themeColor }} type={"base"}>Your RFQs</Text>
                        </View>

                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.google, justifyContent: 'center', alignItems: 'center' }}>
                            <Text size={'small'} style={{ color: Colors.white }} type={"base"}>1</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <TouchableOpacity onPress={() => props.navigation.navigate("Order")} style={[styles.boxView, {
                        borderBottomColor: Colors.borderColor,
                        borderBottomWidth: 1,
                    }]}>

                        <View>
                            <Text size={'medium'} style={{ color: Colors.themeColor }} type={"base"}>Purchase Order</Text>
                        </View>

                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.lightGrey, justifyContent: 'center', alignItems: 'center' }}>
                            <Text size={'small'} style={{ color: Colors.white }} type={"base"}>1</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </LinearGradient >
    );
}

export default Home;