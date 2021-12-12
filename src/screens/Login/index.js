import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import MainTextInput from '../../components/MainTextInput';
import { Images } from "../../themes/Images";
import Icon from "../../helpers/Icons";
import styles from "./styles";
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen'
function Login({ navigation }) {
    const [state, setState] = React.useState({ email: '', password: '' })
    const _handleTextChange = (name, val) => {
        setState({
            ...state,
            [name]: val
        })
    }
    SplashScreen.hide()
    const login = () => {
        console.log("login");
        navigation.navigate("Drawer")
    }
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
                    onChangeText={(t) => _handleTextChange("email", t)}
                    value={state.email}
                    label={"Email"}
                    placeholder=""
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                />


                <MainTextInput
                    Icon={
                        <Icon.MaterialCommunityIcons
                            name="lock-outline"
                            style={styles.iconStyle}
                        />
                    }
                    secureTextEntry={true}
                    onChangeText={(t) => _handleTextChange("password", t)}
                    value={state.password}
                    label={"Password"}
                    // placeholder="**********"
                    autoCapitalize={"none"}
                    rightIcon={true}
                    passowrdhide={true}
                />

                <View style={styles.bottomContainer}>
                    <View style={styles.buttonView}>
                        <Button btnPress={login} label={"Login"} />
                    </View>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}

export default Login;