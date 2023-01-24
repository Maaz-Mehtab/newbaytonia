import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MainTextInput from '../../components/MainTextInput';
import {Picker} from '@react-native-picker/picker';
import {Images} from '../../themes/Images';
import Icon from '../../helpers/Icons';
import styles from './styles';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Buffer from 'buffer';
import userAction from '../../store/action/user';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import util from '../../helpers/util';
import {Colors} from '../../themes';
import {StringConstants} from '../../helpers/stringConstant';
import Api from '../../helpers/Apis';
import EndPoints from '../../helpers/EndPoints';
function Signup({navigation}) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    gender: false,
    age: '',
    referralId: '',
    password: '',
    vehicle: '',
  });
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [deliveryBoyTypeDdl, setDeliveryBoyTypeDdl] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  SplashScreen.hide();

  React.useEffect(() => {
    getDeliveryBoyType();
  }, []);

  const getDeliveryBoyType = async () => {
    setDeliveryBoyTypeDdl([]);
    let response = await Api.get(EndPoints.Auth.delivery_boyTypes, {});
    if (response?.success) {
      setDeliveryBoyTypeDdl(response?.db_types);
    }
  };

  const _validation = () => {
    const {email, name, phone, gender, age, referralId, password, vehicle} =
      state;
    if (util.stringIsEmpty(name)) {
      util.errorMsg('Enter User Name');
      return false;
    }
    if (util.stringIsEmpty(phone)) {
      util.errorMsg('Enter Phone Number');
      return false;
    }

    if (util.stringIsEmpty(email)) {
      util.errorMsg('Enter Email');
      return false;
    }
    if (util.stringIsEmpty(password)) {
      util.errorMsg('Enter Password');
      return false;
    }
    if (util.stringIsEmpty(selectedCity)) {
      util.errorMsg('Select City');
      return false;
    }
    if (util.stringIsEmpty(selectedValue)) {
      util.errorMsg('Select User Type');
      return false;
    }
    if (selectedValue == '2' && util.stringIsEmpty(vehicle)) {
      util.errorMsg('Enter Vehicle Details');
      return false;
    }
    return true;
  };
  const onRegister = () => {
    if (!_validation()) {
      return;
    } else {
      let payload = {
        params: {
          name: state?.name,
          phone: state.phone,
          email: state.email,
          city: selectedCity,
          db_type_id: selectedValue,
          password: state?.password,
          internal_reference: state?.referralId,
        },
      };
      if (selectedValue == '1') {
        payload.params.vehicle_details = state?.vehicle;
      }
      onRegisterApiCall(payload);
    }
  };

  const onRegisterApiCall = async payload => {
    let response = await Api.apiPost(EndPoints.Auth.register, payload);
    if (response?.result?.success) {
      util.successMsg(response?.result?.success);
      resetForm();
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } else {
      util.errorMsg(response?.result?.fail);
    }
  };

  const resetForm = () => {
    setState({
      email: '',
      password: '',
      name: '',
      phone: '',
      gender: false,
      age: '',
      referralId: '',
      password: '',
      vehicle: '',
    });
  };

  return (
    <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
            <Icon.Ionicons name="arrow-back" color={Colors.white} size={28} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>
            {StringConstants.JoinToBaytonia}
          </Text>
        </View>

        <ScrollView>
          <View style={styles.registeredContainer}>
            <MainTextInput
              Icon={
                <Icon.FontAwesome5
                  name="user-circle"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('name', t)}
              value={state.name}
              label={StringConstants.Name}
              placeholder=""
              //   keyboardType=''
              autoCapitalize={'none'}
            />

            <MainTextInput
              Icon={<Icon.FontAwesome5 name="phone" style={styles.iconStyle} />}
              onChangeText={t => _handleTextChange('phone', t)}
              value={state.phone}
              label={StringConstants.PhoneNo}
              placeholder=""
              keyboardType="number-pad"
              autoCapitalize={'none'}
            />

            <MainTextInput
              Icon={
                <Icon.MaterialCommunityIcons
                  name="email-outline"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('email', t)}
              value={state.email}
              label={StringConstants.Email}
              placeholder=""
              keyboardType={'email-address'}
              autoCapitalize={'none'}
            />

            <MainTextInput
              Icon={
                <Icon.MaterialCommunityIcons
                  name="lock-outline"
                  style={styles.iconStyle}
                />
              }
              secureTextEntry={true}
              onChangeText={t => _handleTextChange('password', t)}
              value={state.password}
              label={StringConstants.Password}
              // placeholder="**********"
              autoCapitalize={'none'}
              rightIcon={true}
              passowrdhide={true}
            />

            <MainTextInput
              Icon={
                <Icon.FontAwesome5
                  name="user-friends"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('referralId', t)}
              value={state.referralId}
              label={StringConstants.ReferralId}
              placeholder=""
              keyboardType="name-phone-pad"
              autoCapitalize={'none'}
            />

            <View style={styles.main}>
              <View style={styles.iconsRound}>
                <Icon.MaterialIcons
                  name="location-on"
                  style={styles.iconStyle}
                />
              </View>
              <View style={styles.dropDownView}>
                <Picker
                  selectedValue={selectedCity}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCity(itemValue)
                  }>
                  <Picker.Item label="Select a city" value="" />
                  <Picker.Item label={'Jeddah'} value="jeddah" />
                  <Picker.Item label={'Riyadh'} value="riyadh" />
                  <Picker.Item label={'Dammam'} value="dammam" />
                </Picker>
              </View>
            </View>

            <View style={styles.main}>
              <View style={styles.iconsRound}>
                <Icon.FontAwesome5
                  name="user-friends"
                  style={styles.iconStyle}
                />
              </View>
              <View style={styles.dropDownView}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Please select option" value="" />
                  {deliveryBoyTypeDdl?.map((val, ind) => (
                    <Picker.Item key={ind} label={val.name} value={val.id} />
                  ))}
                  
                </Picker>
              </View>
            </View>

            {selectedValue == '1' && (
              <MainTextInput
                Icon={
                  <Icon.FontAwesome5 name="car-side" style={styles.iconStyle} />
                }
                onChangeText={t => _handleTextChange('vehicle', t)}
                value={state.vehicle}
                label={StringConstants.VehicleDetail}
                placeholder=""
                // keyboardType="name-phone-pad"
                autoCapitalize={'none'}
              />
            )}

            <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button
                  loader={loader}
                  btnPress={onRegister}
                  label={StringConstants.SubmitYourRequest}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.buttonView}>
                <Text style={styles.registerText}>
                  {StringConstants.BackToLogin}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Signup;
