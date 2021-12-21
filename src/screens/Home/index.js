import * as React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import { Colors, Metrics } from '../../themes';
import styles from './styles';
import Icons from '../../helpers/Icons';
import ButtonIcon from '../../components/ButtonIcon';
import HomeAction from '../../store/action/home'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            isOnline: true

        }

    }


    componentDidMount() {
        this.fetchDashboardData();
    }

    fetchDashboardData = () => {
        let id = this.props.user?.userdata?.deliveryBoyPartnerId
        this.props.fetchDeliveryOrders(id)
        this.props.fetchReturnOrders(id)
    }

    setOnline = () => {
        this.setState({
            isOnline: !this.state.isOnline
        })
    }
    setSelectedItem = (id) => {
        this.setState({
            selectedIndex: id
        })
    }

    render() {
        const {deliverOrder ,returnOrder } = this.props.order
        return (
            <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
                <SafeAreaView style={styles.safeAreaTop} />
                <View style={styles.mainTopView}>
                    <View style={styles.ParentTopView}>
                        <View style={styles.ordersView}>
                            <Icons.MaterialCommunityIcons name="truck-delivery-outline" color={Colors.white} size={24} />
                            <Text style={styles.orderText}>{deliverOrder.deliveryBoyPickings?.delivered.length}</Text>
                        </View>
                        <Text style={styles.orderMainText}>Orders Delivered</Text>
                    </View>

                    <View style={styles.ParentTopView}>
                        <View style={styles.ordersView}>
                            <Icons.MaterialIcons name="assignment-return" color={Colors.white} size={24} />
                            <Text style={styles.orderText}>{returnOrder?.deliveryBoyPickings?.delivered?.length}</Text>
                        </View>
                        <Text style={styles.orderMainText}>Orders Returned</Text>
                    </View>
                </View>


                <View style={styles.myOrderView}>
                    <Text style={{ fontSize: Metrics.ratio(20), fontWeight: 'bold', color: Colors.themeColor }}>My Orders</Text>
                </View>


                <View style={styles.ListView}>

                    <TouchableOpacity activeOpacity={1} onPress={() => this.setSelectedItem(0)} style={this.state.selectedIndex == 0 ? styles.activeListView : styles.inActiveListView}>
                        <Text style={this.state.selectedIndex == 0 ? styles.activeText : styles.inActiveText}>Delivery ({deliverOrder?.pendingOrder})</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => this.setSelectedItem(1)} style={this.state.selectedIndex == 1 ? styles.activeListView : styles.inActiveListView}>
                        <Text style={this.state.selectedIndex == 1 ? styles.activeText : styles.inActiveText}>Return ({deliverOrder?.pendingReturn})</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20, }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Order")} style={styles.listButtonView}>
                        <Icons.AntDesign name="exclamationcircle" color={Colors.themeColor} size={20} />
                        <Text style={styles.ordersText}>Assigned Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listButtonView}>
                        <Icons.AntDesign name="pluscircle" color={Colors.themeColor} size={20} />
                        <Text style={styles.ordersText}>Accepted Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listButtonView}>
                        <Icons.AntDesign name="checkcircle" color={Colors.themeColor} size={20} />
                        <Text style={styles.ordersText}>Complete Orders</Text>
                    </TouchableOpacity>
                </View>






                <View style={styles.bottomContainer}>
                    <View style={styles.buttonView}>
                        <ButtonIcon
                            Icon={
                                <Icons.Entypo
                                    name="location-pin"
                                    style={styles.iconStyle}
                                />
                            }

                            btnPress={() => this.setOnline()}
                            label={(this.state.isOnline) ? "You Are offline" : "You Are Online"} />
                    </View>
                </View>


                <View style={styles.bottomContainer}>
                    <View style={styles.buttonView}>
                        <ButtonIcon
                            Icon={
                                <Icons.AntDesign
                                    name="scan1"
                                    style={styles.iconStyle}
                                />
                            }

                            btnPress={() => null} label={"Scan Qr Code"} />
                    </View>
                </View>




            </LinearGradient>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.AuthReducers,
        order: state.HomeReducers

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeliveryOrders: (id) => dispatch(HomeAction.deliveryOrder(id)),
        fetchReturnOrders: (id) => dispatch(HomeAction.returnOrder(id))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);