import * as React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import MainTextInput from '../../components/MainTextInput';
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
function Login({navigation}) {
  const dispatch = useDispatch();
  // const [state, setState] = React.useState({ email: 'db@baytonia.com', password: 'Db123456789!!' })
  // const [state, setState] = React.useState({ email: 'app.dev@baytonia.com', password: 'M123456!' })
  // const [state, setState] = React.useState({ email: 'maaz.app@baytonia.com', password: 'M123!' })
  const [state, setState] = React.useState({email: '', password: ''});
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
        <View style={styles.logoView}>
          <Image style={styles.logo} source={Images.logo} />
        </View>

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

        <View style={styles.bottomContainer}>
          <View style={styles.buttonView}>
            <Button loader={loader} btnPress={loginUserCheck} label={'Login'} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.buttonView}>
            <Text style={styles.registerText}>Register a New User</Text>
          </TouchableOpacity>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Login;
