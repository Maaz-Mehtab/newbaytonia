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
    refferalId: '',
    password: '',
  });
  const [selectedValue, setSelectedValue] = React.useState('');

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

  const loginUserCheck = async () => {
    try {
      if (state.email == '') {
        util.errorMsg('Enter Email Address');
        return;
      } else if (state.password == '') {
        util.errorMsg('Enter Password');
        return;
      }
      await login();
    } catch (error) {
      console.log('exception', error);
    }
  };

  const login = async () => {
    try {
      setLoader(true);
      let fcmToken = await fetchFCMToken();
      let loginrequestObject = {
        login: state.email,
        pwd: state.password,
      };
      let loginRequestString = JSON.stringify(loginrequestObject);
      let loginRequestBase64 =
        Buffer.Buffer.from(loginRequestString).toString('base64');
      let requestbody = {
        fcmToken: fcmToken,
        fcmDeviceId: 'DoctorStrange',
        login: loginRequestBase64,
      };
      dispatch(userAction.login(requestbody)).then(res => {
        if (res?.success) {
          util.successMsg(res?.message);
          navigation.navigate('Drawer');
          setLoader(false);
        } else {
          util.errorMsg(res?.message);
          setLoader(false);
        }
      });
    } catch (e) {
      setLoader(false);
      console.log('Exception => login', e);
    }
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
          <Text style={styles.textHeader}>Join To Baytonia Delivery Team</Text>
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
              label={'Name'}
              placeholder=""
              //   keyboardType=''
              autoCapitalize={'none'}
            />

            <MainTextInput
              Icon={<Icon.FontAwesome5 name="phone" style={styles.iconStyle} />}
              onChangeText={t => _handleTextChange('phone', t)}
              value={state.phone}
              label={'Phnoe Number'}
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
              label={'Email'}
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
              label={'Password'}
              // placeholder="**********"
              autoCapitalize={'none'}
              rightIcon={true}
              passowrdhide={true}
            />

            <View style={styles.rowView}>
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
                    <Text style={styles.genderText}>Male</Text>
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
                    <Text style={styles.genderText}>Female </Text>
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
                  label={'Age'}
                  // placeholder="**********"
                  autoCapitalize={'none'}
                  keyboardType="number-pad"
                  // rightIcon={true}
                  // passowrdhide={true}
                />
              </View>
            </View>

            <MainTextInput
              Icon={
                <Icon.FontAwesome5
                  name="user-friends"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('refferalId', t)}
              value={state.refferalId}
              label={'Referral ID'}
              placeholder=""
              keyboardType="name-phone-pad"
              autoCapitalize={'none'}
            />

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
                  <Picker.Item label="Tehnician" value="Tehnician" />
                  <Picker.Item label="Driver" value="Driver" />
                </Picker>
              </View>
            </View>

            {selectedValue == 'Driver' && (
              <MainTextInput
                Icon={
                  <Icon.FontAwesome5 name="car-side" style={styles.iconStyle} />
                }
                onChangeText={t => _handleTextChange('refferalId', t)}
                value={state.refferalId}
                label={'Vehicle Detail'}
                placeholder=""
                // keyboardType="name-phone-pad"
                autoCapitalize={'none'}
              />
            )}

            <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button
                  loader={loader}
                  btnPress={loginUserCheck}
                  label={'Submit your Request'}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.buttonView}>
                <Text style={styles.registerText}>Back to Login</Text>
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
