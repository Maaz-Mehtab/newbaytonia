import * as React from 'react';
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Icons from "../../helpers/Icons";
import { Colors, Metrics } from '../../themes';
import { Images } from "../../themes/Images";
import styles from './styles';
function Detail(props) {



    return (
        <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.mainTopView}>
                    <View style={styles.ParentTopView}>
                        <View style={styles.mainView}>
                            <View style={styles.partialView}>
                                <Text style={{ color: Colors.white }} size="xxSmall">Status</Text>
                            </View>
                            <View style={styles.halfView}>
                                <Text size="xxxxSmall">Assigned</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ParentTopView}>
                        <View style={styles.mainView}>
                            <View style={styles.partialView}>
                                <Text style={{ color: Colors.white }} size="xxSmall">Date</Text>
                            </View>
                            <View style={styles.halfView}>
                                <Text size="xxxxSmall">12 Dec 2021</Text>
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
                        <Text size={'xxxSmall'}> {"2"}</Text>
                    </View>

                    <View style={styles.itemView}>
                        <Text size={'xSmall'}>Item (1) : </Text>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{'lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum'}</Text>
                    </View>

                    <View style={styles.itemView}>
                        <Text size={'xSmall'}>Item (2) : </Text>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{'lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum'}</Text>
                    </View>
                </View>

                <View
                    style={styles.boxView}>
                    <View style={styles.boxHeaderView}>
                        <Text size={'medium'} style={styles.headerText} type={"heading"}>{"Delivery Address"}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{'lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum'}</Text>
                    </View>
                </View>

                <View
                    style={styles.boxView}>
                    <View style={styles.boxHeaderView}>
                        <Text size={'medium'} style={styles.headerText} type={"heading"}>{"Customer Detail"}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={{ flex: 1, }} size={'xxxSmall'}>{'lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum'}</Text>
                    </View>

                    <View style={styles.itemView}>
                        <Icons.MaterialCommunityIcons name="cellphone" color={Colors.themeColor} size={24} />
                        <Text style={{ flex: 1, paddingLeft: 5 }} size={'xxxSmall'}>{'0900 123123123'}</Text>
                    </View>

                    <View style={styles.itemView}>
                        <Icons.MaterialCommunityIcons name="whatsapp" color={Colors.themeColor} size={24} />
                        <Text style={{ flex: 1, paddingLeft: 5 }} size={'xxxSmall'}>{'0900 123123123'}</Text>
                    </View>
                </View>


                <View style={styles.bottomContainer}>
                    <View style={styles.buttonView}>
                        <Button btnPress={()=>null} label={"Accept Order"} />
                    </View>
                </View>



            </SafeAreaView>
        </LinearGradient >
    );
}

export default Detail;