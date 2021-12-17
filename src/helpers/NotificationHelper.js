import { Alert, Platform, AppState } from "react-native";
import utils from "./util";
// import { Actions } from "react-native-router-flux";
import messaging from "@react-native-firebase/messaging";
import { updateToken } from "../actions/AppSettings";
import { DataHelper } from "../helpers";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
class NotificationsHelper {
  getToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        //   console.log("token",token)
        // DataHelper.getStore().dispatch(updateToken(token));

        // if (DataHelper.isUserAuthenticated()) {
        //   DataHelper.updateDeviceTokenOnServer(token);
        // }
        
        return token;
      });
  };

  refreshToken = () => {
    messaging().onTokenRefresh((token) => {
    //   DataHelper.getStore().dispatch(updateToken(token));

    //   if (DataHelper.isUserAuthenticated()) {
    //     DataHelper.updateDeviceTokenOnServer(token);
    //   }
    });
  };

  forwardRef = (remoteMessage) => {
    const data = remoteMessage.data;
    Alert.alert(
      "",
      remoteMessage.notification.body + "\n" + remoteMessage.notification.title,
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        // move route if press okay button
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
    );
    const { type } = data;

    switch (type) {
      case "order_created":
        Actions.replace("order");
        break;
      case "order_rejected":
        Actions.replace("order");
        break;
      case "order_accepted":
        Actions.replace("order");
        break;
      case "order_cancelled":
        Actions.replace("order");
        break;
      case "order_completed":
        Actions.replace("order");
        break;
      case "order_reported_by_customer":
        Actions.replace("order");
        break;
      case "order_reported_by_freelancer":
        Actions.replace("order");
        break;
      case "service_published":
        break;
      case "service_unpublished":
        break;
      case "service_reviewed":
        break;
      case "password_changed":
        break;
      default:
        break;
    }
  };

  onPressNotificationPopUp = () => {
    Actions.settings();
  };

  IosNotification = (remoteMessage) => {
    try {
      // if (AppState.currentState == "active") {
      //   let detail = {
      //     alertBody: remoteMessage.notification.body,
      //     alertTitle: remoteMessage.notification.title,
      //     alertAction: () => this.onPressNotificationPopUp(),
      //   };
      //   PushNotificationIOS.presentLocalNotification(detail);
      //   this.forwardRef(remoteMessage);
      //   return;
      // }

      PushNotificationIOS.addEventListener(
        "registrationError",
        (registrationError) => {
          console.log("registrationError", registrationError);
        },
      );

      PushNotificationIOS.addEventListener(
        "notification",
        function (notification) {
          if (!notification) {
            return;
          }
        },
      );

      PushNotificationIOS.getInitialNotification().then((notification) => {
        if (!notification) {
          return;
        }
        PushNotificationIOS.removeAllDeliveredNotifications();
      });
      PushNotificationIOS.requestPermissions();
    } catch (e) {
      console.log("Exception ", e);
    }
  };

  initializeFCM = () => {
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage", remoteMessage);
      if (Platform.OS == "ios") {
        this.IosNotification(remoteMessage);
      }
      this.dataAndMessageReceiveHandler(remoteMessage);
    });

    if (!utils.isPlatformAndroid()) {
      messaging()
        .getIsHeadless()
        .then((isHeadless) => {});
    }
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const data = remoteMessage.data;
      this.forwardRef(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      this.forwardRef(remoteMessage);
    });
  };

  checkFCMPermission = async () => {
    if (!utils.isPlatformAndroid()) {
      const authStatus = await messaging().requestPermission({
        sound: true,
        announcement: true,
        alert: true,
        badge: true,
        carPlay: true,
        provisional: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
      }
    }
  };

  getInitialNotification = () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
        }
      });
  };

  appMount = () => {
    this.initializeFCM();
    this.checkFCMPermission();
    this.getInitialNotification();
  };

  unMount = () => {
    this.messageListener();
  };

  dataAndMessageReceiveHandler = (notification) => {
    const data = notification.data;

    const { type } = data;

    // switch (type) {
    //   case "order_created":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_rejected":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_accepted":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_cancelled":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_completed":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_reported_by_customer":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "order_reported_by_freelancer":
    //     DataHelper.updateBookingsOrOrders();

    //     break;
    //   case "service_published":
    //     break;
    //   case "service_unpublished":
    //     break;
    //   case "service_reviewed":
    //     break;
    //   case "password_changed":
    //     break;
    //   default:
    //     break;
    // }
  };
}

export default new NotificationsHelper();