import React, { useState } from 'react';
import { View, SafeAreaView, Dimensions, Modal, ActivityIndicator, Image, Platform, FlatList, TouchableOpacity, Linking } from 'react-native';

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
import util from '../../helpers/util';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { BaseURL, BASIC_AUTH_KEY } from '../../helpers/config';
const dev_url = BaseURL
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Apptheme = "#733646"
function Detail(props) {
    const dispatch = useDispatch();
    // console.log("props",props.route.params.id);
    const id = props.route.params.id;
    const [ModalOpen, setModalOpen] = useState(false)
    const [loader, setLoader] = useState(false)
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
    const openCamera = () => {
        ImagePicker.clean();

        setModalOpen(false)
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            includeBase64: true,
        }).then(imageDetail => {
            changeProfileImage(imageDetail);


        });
    }
    const openGallery = () => {
        try {
            ImagePicker.clean();
            setModalOpen(false)
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                mediaType: "photo",
                // cropping: true,
                includeBase64: true,
            }).then(imageDetail => {
                changeProfileImage(imageDetail)
            });
        }
        catch (e) {
            console.log("openGallery Exception", e)
        }
    }

    const changeProfileImage = async (imagedata) => {
        try {
            setLoader(true)
            let url = dev_url + "/upload/picking/image/" + state.id;
            let headers = {
                "Accept": "application/json",
                "Authorization": BASIC_AUTH_KEY,
                "lang": 'en_US',
                // "Login": this.props.user.login
            }
            let requestBody = JSON.stringify({
                "image": imagedata.data,
            })
            let response = await axios.post(url, requestBody);

            console.log("response", response);
            util.successMsg("Image upload successfully")
            setLoader(false)
        }
        catch (e) {
            console.log("Exception Upload Image", e)
            util.errorMsg("invalid image type")
            // this.refs.toast.show('invalid image type ', DURATION.LENGTH_SHORT)
            // this.setState({
            //     isloader: false
            // })
            setLoader(false)
        }
    }
    const imageModal = () => {
        return (
            <Modal
                transparent
                visible={ModalOpen}
                style={styles.modal}
                animationType={"slide"}
                onRequestClose={() => setModalOpen(!ModalOpen)}>
                <TouchableOpacity
                    onPress={() => setModalOpen(!ModalOpen)}
                    style={styles.modalOverlay}
                />
                <View style={styles.modalSection1}>
                    <View style={styles.modalSection1View}>
                        <View
                            style={styles.modalHeader}>
                            <Text type="heading" style={[styles.modalheaderText, { color: "#fff" }]}>
                                Select Photo
                            </Text>
                        </View>


                        <TouchableOpacity
                            onPress={() => openCamera()}
                            style={styles.modalButtons}>
                            <Icons.AntDesign name="delete" color={"#733646"} style={{ fontSize: 24, paddingRight: 25 }} />
                            <Text type="heading" style={styles.modalButtonText}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => openGallery()}
                            style={styles.modalButtons}>
                            <Icons.FontAwesome name="photo" color={"#733646"} style={{ fontSize: 24, paddingRight: 25 }} />
                            <Text type="heading" style={styles.modalButtonText}>
                                Gallery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalOpen(!ModalOpen)}
                            style={styles.delelteModalButton}>
                            <Text type="heading" style={styles.deleteText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        )
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

                {state?.pickingState == "assigned" &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonView}>
                            <Button loader={loader} btnPress={() => setModalOpen(true)} label={"Upload Image"} />
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


                {imageModal()}
                <Toast ref={(ref) => Toast.setRef(ref)} />

            </SafeAreaView>
        </LinearGradient >
    );
}

export default Detail;