import * as React from 'react';
import {
  View,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import {Colors, Metrics} from '../../themes';
import styles from './styles';
import Icons from '../../helpers/Icons';
import ButtonIcon from '../../components/ButtonIcon';
import HomeAction from '../../store/action/home';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import {BaseURL, BASIC_AUTH_KEY} from '../../helpers/config';
const dev_url = BaseURL;
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');
import Toast from 'react-native-toast-message';
import util from '../../helpers/util';
import {StringConstants} from '../../helpers/stringConstant';

export var updateLanguage;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      isOnline: true,
      isOpenQrCode: false,
      language: false,
      userOnline: true,
      loader: false,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
    this.props.navigation.addListener('didFocus', () => {
      // this.fetchDashboardData();
    });
  }

  updateLanguage = (updateLanguage = () => {
    this.setState({
      language: !this.state.language,
    });
  });

  toggleQrCodeScanner = () => {
    this.setState({
      isOpenQrCode: !this.state.isOpenQrCode,
    });
  };
  redeemScanVoucher = data => {
    this.setState({
      isOpenQrCode: false,
    });
    let barCode = data.data;
    this.barcodeServiceCall(barCode);
  };

  barcodeServiceCall = async barCode => {
    try {
      let endpoint = '/deliveryBoy/' + barCode + '/barcode';
      let url = dev_url + endpoint;
      let headers = {
        Accept: 'application/json',
        Authorization: BASIC_AUTH_KEY,
        lang: 'en_US',
        Login: this.props.user.login,
      };
      let response = await axios.get(url, {headers});
      console.log('barcodeServiceCall response', response);
      if (response.status == 200) {
        if (response.data.barcode.length > 0 && response?.data?.barcode[0]?.DeliveryBoyPickingId !="") {
          let id = response?.data?.barcode[0]?.DeliveryBoyPickingId;
          this.props.navigation.navigate('Detail', {id: id});
        } else {
          util.errorMsg('there is no record found by this Qr code .');
        }
      } else {
        util.errorMsg('Odoo server Error.');
      }
    } catch (e) {
      console.log('exception', e);
    }
  };

  componentDidMount() {
    this.fetchDashboardData();
    this.usetStatusCheck();
  }

  usetStatusCheck = () => {
    let status = this.props.user?.userdata.status;
    this.setState({
      userOnline: status == 'online' ? true : false,
    });
  };

  fetchDashboardData = () => {
    let id = this.props.user?.userdata?.deliveryBoyPartnerId;
    this.props.fetchDeliveryOrders(id);
    this.props.fetchReturnOrders(id);
  };

  setOnline = async () => {
    try {
      this.setState({
        loader: true,
      });
      let url =
        dev_url +
        '/deliveryBoy/' +
        this.props.user?.userdata?.deliveryBoyPartnerId;
      let headers = {
        Accept: 'application/json',
        Authorization: BASIC_AUTH_KEY,
        Login: this.props.user.login,
      };
      let data = {
        status: this.state.isOnline ? 'offline' : 'online',
      };
      var bodyFormData = new FormData();
      bodyFormData.append('status', data.status);
      let response = await axios.put(url, bodyFormData, {headers});
      if (response?.data?.success) {
        util.successMsg('user status successfully updated');
        this.setState({
          isOnline: response.data.status == 'online' ? true : false,
        });
      } else {
        util.errorMsg(response?.data?.message);
      }
      this.setState({
        loader: false,
      });
    } catch (e) {
      console.log('Exception Upload Image', e);
      this.setState({
        loader: false,
      });
    }
  };
  setSelectedItem = id => {
    this.setState({
      selectedIndex: id,
    });
  };

  navigationOrder = param => {
    try {
      param = param == 'delivered' ? 'invoiced' : param;
      let data = [];
      let title = '';
      if (this.state.selectedIndex == 0) {
        data = this.props.order?.deliverOrder?.deliveryBoyPickings[param];
        data = data.filter(a => a.DeliveryType == 'order');
      } else {
        data = this.props.order?.returnOrder?.deliveryBoyPickings[param];
        data = data.filter(a => a.DeliveryType != 'order');
      }
      title =
        param == 'assigned'
          ? StringConstants.AssignedOrders
          : param == 'accept'
          ? StringConstants.AcceptedOrders
          : StringConstants.CompletedOrders;
      this.props.navigation.push('Order', {
        data: data,
        title: title,
        type: this.state.selectedIndex,
        param: param,
      });
    } catch (e) {
      console.log('exception => Home => navigationOrder', e);
    }
  };
  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.order.loading}
        onRefresh={() => this.fetchDashboardData()}
      />
    );
  }

  render() {
    const {deliverOrder, returnOrder, loading} = this.props.order;

    // console.log("loading",loading);
    // console.log("order",this.props.order);
    return (
      <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
        <SafeAreaView style={styles.safeAreaTop} />
        <ScrollView
          contentContainerStyle={[
            styles.scrollviewStyle,
            {width: SCREEN_WIDTH},
          ]}
          scrollEnabled={true}
          horizontal={false}
          automaticallyAdjustContentInsets={true}
          refreshControl={this._refreshControl()}>
          {(loading || this.state.loader) && (
            <View
              style={{
                width: '100%',
                height: Metrics.vh * 85,
                backgroundColor: Colors.border,
                opacity: 0.2,
                position: 'absolute',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}>
              <ActivityIndicator color={Colors.themeColor} size="large" />
            </View>
          )}
          <ScrollView>
            <View style={styles.mainTopView}>
              <View style={styles.ParentTopView}>
                <View style={styles.ordersView}>
                  <Icons.MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={Colors.white}
                    size={24}
                  />
                  <Text style={styles.orderText}>
                    {deliverOrder.deliveryBoyPickings?.delivered.length}
                  </Text>
                </View>
                <Text style={styles.orderMainText}>
                  {StringConstants.TotalOrdersDeliveredLabel}
                </Text>
              </View>

              <View style={styles.ParentTopView}>
                <View style={styles.ordersView}>
                  <Icons.MaterialIcons
                    name="assignment-return"
                    color={Colors.white}
                    size={24}
                  />
                  <Text style={styles.orderText}>
                    {returnOrder?.deliveryBoyPickings?.delivered?.length}
                  </Text>
                </View>
                <Text style={styles.orderMainText}>
                  {StringConstants.ReturnOrder}
                </Text>
              </View>
            </View>

            <View style={styles.myOrderView}>
              <Text
                style={{
                  fontSize: Metrics.ratio(20),
                  fontWeight: 'bold',
                  color: Colors.themeColor,
                }}>
                {StringConstants.MyOrders}
              </Text>
            </View>

            <View style={styles.ListView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setSelectedItem(0)}
                style={
                  this.state.selectedIndex == 0
                    ? styles.activeListView
                    : styles.inActiveListView
                }>
                <Text
                  style={
                    this.state.selectedIndex == 0
                      ? styles.activeText
                      : styles.inActiveText
                  }>
                  {StringConstants.DELIVERY} ({deliverOrder?.pendingOrder})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setSelectedItem(1)}
                style={
                  this.state.selectedIndex == 1
                    ? styles.activeListView
                    : styles.inActiveListView
                }>
                <Text
                  style={
                    this.state.selectedIndex == 1
                      ? styles.activeText
                      : styles.inActiveText
                  }>
                  {StringConstants.RETURN} ({deliverOrder?.pendingReturn})
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 20}}>
              <TouchableOpacity
                onPress={() => this.navigationOrder('assigned')}
                style={styles.listButtonView}>
                <Icons.AntDesign
                  name="exclamationcircle"
                  color={Colors.themeColor}
                  size={20}
                />
                <Text style={styles.ordersText}>
                  {StringConstants.AssignedOrders}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.navigationOrder('accept')}
                style={styles.listButtonView}>
                <Icons.AntDesign
                  name="pluscircle"
                  color={Colors.themeColor}
                  size={20}
                />
                <Text style={styles.ordersText}>
                  {StringConstants.AcceptedOrders}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.navigationOrder('delivered')}
                style={styles.listButtonView}>
                <Icons.AntDesign
                  name="checkcircle"
                  color={Colors.themeColor}
                  size={20}
                />
                <Text style={styles.ordersText}>
                  {StringConstants.CompletedOrders}
                </Text>
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
                  label={
                    this.state.isOnline ? 'You Are  Online' : 'You Are Offline'
                  }
                />
              </View>
            </View>

            <View style={[styles.bottomContainer, {marginBottom: 20}]}>
              <View style={styles.buttonView}>
                <ButtonIcon
                  Icon={
                    <Icons.AntDesign name="scan1" style={styles.iconStyle} />
                  }
                  btnPress={() => this.toggleQrCodeScanner()}
                  label={'Scan Qr Code'}
                />
              </View>
            </View>
          </ScrollView>

          <Modal
            animationType="none"
            transparent={false}
            visible={this.state.isOpenQrCode}
            onRequestClose={() => {
              this.setState({
                isOpenQrCode: false,
              });
            }}>
            <SafeAreaView style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#733646',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <Icon name="arrow-back" size={22} color="#fff" style={{ paddingLeft: 20 }} onPress={() => this.setState({ isOpenQrCode: false })} /> */}
                <Icons.Ionicons
                  name="arrow-back"
                  style={{marginLeft: 10, marginRight: 20}}
                  onPress={() => this.toggleQrCodeScanner()}
                  color={Colors.white}
                  size={28}
                />
              </View>
              <View style={{flex: 1}}>
                {/* <View style={styles.cameraBGView}>
                                <Icons.AntDesign size={140} name="qrcode" />
                            </View> */}
                <QRCodeScanner
                  onRead={data => this.redeemScanVoucher(data)}
                  reactivate={this.state.reactivate}
                  showMarker={true}
                  cameraStyle={{
                    marginTop: 0,
                    height: '100%',
                    width: SCREEN_WIDTH,
                  }}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.AuthReducers,
    order: state.HomeReducers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDeliveryOrders: id => dispatch(HomeAction.deliveryOrder(id)),
    fetchReturnOrders: id => dispatch(HomeAction.returnOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
