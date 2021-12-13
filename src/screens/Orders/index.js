import * as React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import Icon from "../../helpers/Icons";
import { Colors } from '../../themes';
import styles from './styles';
function Order(props) {
    const orders = [{
        id: '1',
        orderId: '#PO005827',
        orderItem: "Product Coffee table",
        date: "11/28/2021",
        amount: "1150.0"
    },
    {
        id: '2',
        orderId: '#PO005828',
        orderItem: "Product Coffee table",
        date: "11/20/2021",
        amount: "2090.0"
    },
    {
        id: '3',
        orderId: '#PO005829',
        orderItem: "Product Coffee table",
        date: "11/10/2021",
        amount: "2150.0"
    },
    {
        id: '2',
        orderId: '#PO005830',
        orderItem: "Product Coffee table",
        date: "11/20/2021",
        amount: "2090.0"
    },
    {
        id: '3',
        orderId: '#PO005831',
        orderItem: "Product Coffee table",
        date: "11/10/2021",
        amount: "2150.0"
    },
    {
        id: '2',
        orderId: '#PO005832',
        orderItem: "Product Coffee table",
        date: "11/20/2021",
        amount: "2090.0"
    },
    {
        id: '3',
        orderId: '#PO005833',
        orderItem: "Product Coffee table",
        date: "11/10/2021",
        amount: "2150.0"
    }
    ]

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={1}
                onPress={() => props.navigation.navigate("Detail")}
                key={index} style={styles.boxView}>
                <View style={styles.boxHeaderView}>
                    <Text size={'medium'} style={styles.headerText} type={"heading"}>{item.orderId}</Text>
                </View>


                <View style={styles.itemView}>
                    <Text size={'xSmall'}>Order No : {item.orderId}</Text>
                </View>

                <View style={styles.itemView}>
                    <Text size={'xSmall'}>Created Date : {item.date}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 20 }}>
                   <View style={{ paddingBottom: 10, }}>
                        <FlatList
                            data={orders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}

export default Order;