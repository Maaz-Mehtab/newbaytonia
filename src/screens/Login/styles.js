import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.ratio(10),
    height: Metrics.screenHeight * 0.3,
    // marginBottom: Metrics.ratio(10),
    // backgroundColor: "red",
  },

  logo: {
    resizeMode: "contain",
    width: Metrics.ratio(300),
    height: Metrics.ratio(200),
  },
  logoText: {
    color: Colors.descriptionColor,
    marginTop: Metrics.ratio(-20),
    marginBottom: Metrics.ratio(20),
  },
  forgotPassowordView: {
    alignItems: "flex-end",
    padding: Metrics.ratio(10),
  },
  forgotPasswordText: {
    color: Colors.descriptionColor,
    textDecorationLine: "underline",
    fontSize: Metrics.ratio(12),
  },
  buttonView: {
    marginTop: Metrics.ratio(20),
    width: Metrics.vw * 60,
    marginHorizontal: Metrics.vw * 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: Metrics.ratio(20),
    color: Colors.themeColor,
  },
  bottomContainer: {
    flex: 1,
    marginBottom: Metrics.baseMargin,
    // backgroundColor: "red",
  },

});