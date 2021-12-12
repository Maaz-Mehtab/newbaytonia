import { Platform, Alert, ToastAndroid, NativeModules } from "react-native";

class Util {


    getPlatform = () => Platform.OS;

    isPlatformAndroid() {
        return Platform.OS === "android";
    }

    isJSDebugMode() {
        return typeof atob !== "undefined";
    }

    isRelease() {
        return !(this.isJSDebugMode() || __DEV__);
    }

    showAlertWithDelay(title, message, delay = 500) {
        if (!this.alertPresent) {
            this.alertPresent = true;

            setTimeout(() => {
                Alert.alert(
                    title,
                    message,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                this.alertPresent = false;
                            },
                        },
                    ],
                    {
                        cancelable: false,
                    },
                );
            }, delay);
        }
    }


    showYesNoMessage(title, message, onYes, onNo) {
        if (!this.alertPresent) {
            this.alertPresent = true;

            setTimeout(() => {
                Alert.alert(
                    title,
                    message,
                    [
                        {
                            text: "Yes",
                            onPress: () => {
                                if (onYes) {
                                    onYes();
                                }

                                this.alertPresent = false;
                            },
                        },
                        {
                            text: "No",
                            onPress: () => {
                                if (onNo) {
                                    onNo();
                                }

                                this.alertPresent = false;
                            },
                            style: "cancel",
                        },
                    ],
                    { cancelable: false },
                );
            }, 500);
        }
    }


}


export default new Util();