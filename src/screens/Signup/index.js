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
  // const [state, setState] = React.useState({ email: 'db@baytonia.com', password: 'Db123456789!!' })
  // const [state, setState] = React.useState({ email: 'app.dev@baytonia.com', password: 'M123456!' })
  // const [state, setState] = React.useState({ email: 'maaz.app@baytonia.com', password: 'M123!' })
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
  const [loader, setLoader] = React.useState(false);
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  SplashScreen.hide();

  const fetchFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
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
          vehicle_details: selectedValue == '2' ? state?.vehicle : '',
          internal_reference: state?.referralId,
        },
      };
      // console.log('payload', JSON.stringfy(payload));
      this.onRegisterApiCall(payload);
    }
  };

  onRegisterApiCall = async payload => {
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

            {/* <View style={styles.rowView}>
              <View style={styles.genderRow}>
                <View style={styles.iconsRound}>
                  <Icon.MaterialCommunityIcons
                    name="gender-male-female"
                    style={styles.iconStyle}
                  />
                </View>
                <View style={styles.genderView}>
                  <TouchableOpacity
                    onPress={() =>
                      setState({
                        ...state,
                        gender: false,
                      })
                    }
                    style={styles.genderBtnContainer}>
                    <Text style={styles.genderText}>{StringConstants.Male}</Text>
                    {state.gender ? (
                      <Icon.FontAwesome
                        name="circle-o"
                        style={styles.iconStyle}
                      />
                    ) : (
                      <Icon.FontAwesome
                        name="check-circle-o"
                        style={styles.iconStyle}
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setState({
                        ...state,
                        gender: true,
                      })
                    }
                    style={styles.genderBtnContainer}>
                    <Text style={styles.genderText}>{StringConstants.Female} </Text>
                    {!state.gender ? (
                      <Icon.FontAwesome
                        name="circle-o"
                        style={styles.iconStyle}
                      />
                    ) : (
                      <Icon.FontAwesome
                        name="check-circle-o"
                        style={styles.iconStyle}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1}}>
                <MainTextInput
                  Icon={
                    <Icon.MaterialCommunityIcons
                      name="view-agenda"
                      style={styles.iconStyle}
                    />
                  }
                  secureTextEntry={true}
                  onChangeText={t => _handleTextChange('age', t)}
                  value={state.age}
                  label={StringConstants.Age}
                  // placeholder="**********"
                  autoCapitalize={'none'}
                  keyboardType="number-pad"
                />
              </View>
            </View> */}

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
                  <Picker.Item
                    label={StringConstants.AssemblyTechinician}
                    value="1"
                  />
                  <Picker.Item label={StringConstants.Driver} value="2" />
                </Picker>
              </View>
            </View>

            {selectedValue == '2' && (
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
