import * as React from 'react';
import { View, SafeAreaView, ActivityIndicator, Image, Platform, FlatList, TouchableOpacity, Linking} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Icons from "../../helpers/Icons";
import { Colors, Metrics } from '../../themes';
import { Images } from "../../themes/Images";
import styles from './styles';
import HomeAction from '../../store/action/home';
import Toast from 'react-native-toast-message';
import util from '../../helpers/util'
function Detail(props) {
    const dispatch = useDispatch();
    // console.log("props",props.route.params.id);
    const id = props.route.params.id;
    const state = useSelector(state => state.HomeReducers.oderDetail)
    const login = useSelector(state => state.AuthReducers.login)
    const { loading, deliverOrder } = useSelector(state => state.HomeReducers)

    const orderDetail = async () => {
        // await dispatch()
        await dispatch(HomeAction.orderDetail(id, login))
    }
    React.useEffect(() => {
        orderDetail()
    }, [dispatch]);

    const AcceptOrder = async () => {
        const id = state.id;
        let data = {
            "state": 'accept',
        }
        await dispatch(HomeAction.acceptOrder(id, data, login))
        util.successMsg("Order Accepted")
        setTimeout(() => {
            props.navigation.replace("Drawer");
        }, 3000);
    }
    const DeliverOrder = async () => {
        if (deliverOrder.otpRequired && state.DeliveryType == "order") {

        }
        else {
            const id = state.id;
            let data = {
                "state": 'delivered',
            }
            await dispatch(HomeAction.acceptOrder(id, data, login))
            util.successMsg("Order Delivered")
            setTimeout(() => {
                props.navigation.replace("Drawer");
            }, 3000);

        }
    }


    const dialCall = (number) => {
        try {
            var phoneNumber = "";
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${number}`;
            }
            else {
                // phoneNumber = `telprompt:${number}`;
                phoneNumber = `tel://${number}`;
                console.log("phoneNumber", phoneNumber);
            }
            Linking.openURL(phoneNumber);
        }
        catch (e) {
            console.log("dialCall", e);
        }
    }
    const whatsappLink = (number) => {
        try {
            var phoneNumber = "";
            if (Platform.OS === 'android') {
                phoneNumber = `https://wa.me/966${number}`;
            }
            else {
                // phoneNumber = `telprompt:${number}`;
                phoneNumber = `https://wa.me/966${number}`;
            }
            Linking.openURL(phoneNumber);
        }
        catch (e) {
            console.log("dialCall", e);
        }
    }

    return (
        <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
            <SafeAreaView style={styles.container}>
                {loading && <View style={{ width: '100%', height: Metrics.vh * 85, backgroundColor: Colors.border, opacity: 0.2, position: 'absolute', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <ActivityIndicator color={Colors.themeColor} size="large" />
                </View>}
                <View style={styles.mainTopView}>
                    <View style={styles.ParentTopView}>
                        <View style={styles.mainView}>
                            <View style={styles.partialView}>
                                <Text style={{ color: Colors.white }} size="xxSmall">Status</Text>
                            </View>
                            <View style={styles.halfView}>
                                <Text size="xxxxSmall">{state?.pickingState}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ParentTopView}>
                        <View style={styles.mainView}>
                            <View style={styles.partialView}>
                                <Text style={{ color: Colors.white }} size="xxSmall">Date</Text>
                            </View>
                            <View style={styles.halfView}>
                                <Text size="xxxxSmall">{state?.assignedDate}</Text>
                            </View>
                        </View>
                    </View>
                </View>



                <View
                    style={styles.boxView}>
                    <View style={styles.boxHeaderView}>
                        <Text size={'medium'} style={styles.headerText} type={"heading"}>{"Order Detail"}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text size={'xSmall'}>No of Boxes  : </Text>
                        <Text size={'xxxSmall'}> {state?.NumberOfBoxes}</Text>
                    </View>
                    {state?.products != undefined && state?.products.map((val, ind) => {
                        return (
                            <View key={ind} style={styles.itemView}>
                                <Text size={'xSmall'}>({ind + 1}) : </Text>
                                <Text style={{ flex: 1, }} size={'xxxSmall'}>{val.name}</Text>
                            </View>
                        )
                    })}

                </View>

                <View
                    style={styles.boxView}>
                    <View style={styles.boxHeaderView}>
                        <Text size={'medium'} style={styles.headerText} type={"heading"}>{"Delivery Address"}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{state?.customerDisplayAddress}</Text>
                    </View>
                </View>

                <View
                    style={styles.boxView}>
                    <View style={styles.boxHeaderView}>
                        <Text size={'medium'} style={styles.headerText} type={"heading"}>{"Customer Detail"}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{state?.customerAddress}</Text>
                    </View>
                    {state?.phone != "" &&
                        <>
                            <TouchableOpacity onPress={() => dialCall(state?.phone)} style={styles.itemView}>
                                <Icons.MaterialCommunityIcons name="cellphone" color={Colors.themeColor} size={24} />
                                <Text style={{ flex: 1, paddingLeft: 5 }} size={'xxxSmall'}>{state?.phone}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => whatsappLink(state?.phone)} style={styles.itemView}>
                                <Icons.MaterialCommunityIcons name="whatsapp" color={Colors.themeColor} size={24} />
                                <Text style={{ flex: 1, paddingLeft: 5 }} size={'xxxSmall'}>{state?.phone}</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>

                {state?.pickingState == "assigned" &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonView}>
                            <Button btnPress={() => AcceptOrder()} label={"Accept Order"} />
                        </View>
                    </View>
                }

                {state?.pickingState == "accept" &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonView}>
                            <Button btnPress={() => DeliverOrder()} label={"Deliver Order"} />
                        </View>
                    </View>
                }



                <Toast ref={(ref) => Toast.setRef(ref)} />

            </SafeAreaView>
        </LinearGradient >
    );
}

export default Detail;