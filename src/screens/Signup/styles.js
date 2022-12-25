import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary,
  },
  header: {
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(15),
    // paddingHorizontal:Metrics.ratio(5),
  },
  leftIconView: {
    paddingHorizontal: Metrics.ratio(10),
    height: Metrics.ratio(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
    marginTop: Metrics.ratio(90),
    marginBottom: Metrics.ratio(60),
  },
  textHeader: {
    color: Colors.white,
    fontSize: Metrics.ratio(20),
    fontWeight: 'bold',
    paddingLeft: Metrics.ratio(20),
  },

  logo: {
    resizeMode: 'contain',
    width: Metrics.ratio(250),
    height: Metrics.ratio(170),
  },
  logoText: {
    color: Colors.descriptionColor,
    marginTop: Metrics.ratio(-20),
    marginBottom: Metrics.ratio(20),
  },
  forgotPassowordView: {
    alignItems: 'flex-end',
    padding: Metrics.ratio(10),
  },
  forgotPasswordText: {
    color: Colors.descriptionColor,
    textDecorationLine: 'underline',
    fontSize: Metrics.ratio(12),
  },
  buttonView: {
    marginTop: Metrics.ratio(20),
    width: Metrics.vw * 60,
    marginHorizontal: Metrics.vw * 20,
    justifyContent: 'center',
    alignItems: 'center',
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

  genderRow: {
    flex: 1.5,
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(10),

    paddingHorizontal: Metrics.ratio(10),
  },
  genderView: {
    borderBottomColor: Colors.borderColor,
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 50,
  },
  iconsRound: {
    width: Metrics.ratio(45),
    height: Metrics.ratio(45),
    borderRadius: Metrics.ratio(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.themeColor,
    backgroundColor: Colors.transparent,
  },
  genderBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.ratio(10),
    // peddingLeft: Metrics.ratio(10),
  },
  genderText: {
    paddingLeft: Metrics.ratio(5),
    paddingRight: Metrics.ratio(5),
  },
  registeredContainer: {
    marginTop: Metrics.ratio(50),
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    overflow: "hidden",
    borderRadius: Metrics.borderRadius,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    minHeight: Metrics.ratio(50),
    marginVertical: Metrics.ratio(8),
    marginHorizontal: Metrics.ratio(10),
},
dropDownView:{
  flex:1,
  borderBottomWidth: 1,
  borderBottomColor:Colors.borderColor
  
}
});
