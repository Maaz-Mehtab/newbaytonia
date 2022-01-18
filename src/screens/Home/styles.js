import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../themes";

export default StyleSheet.create({
    container: {
        flex: 1,

    },
    safeAreaTop: {
        flex: 0,
    },

    mainView: {
        width: '100%',
        height: 60,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    mainTopView: {

        height: Metrics.ratio(120),
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ParentTopView: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ordersView: {

        width: Metrics.ratio(60),
        height: Metrics.ratio(60),
        borderRadius: Metrics.ratio(30),
        backgroundColor: Colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderText: {
        color: Colors.white,
        fontSize: Metrics.ratio(12)
    },
    orderMainText: {
        color: Colors.black,
        fontSize: Metrics.ratio(14),
        paddingVertical: Metrics.ratio(10),
    },
    myOrderView: {

        height: Metrics.ratio(70),
        width: Metrics.vw * 94,
        marginHorizontal: Metrics.vw * 3,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: Colors.white,
        borderColor: Colors.themeColor,
        borderWidth: 2,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    ListView: {

        height: Metrics.ratio(50),
        width: Metrics.vw * 100,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: Colors.white,
        borderColor: Colors.themeColor,
        flexDirection: 'row',
    },
    activeListView: {
        flex: 1,
        backgroundColor: Colors.themeColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveListView :{
        flex: 1,
        backgroundColor: Colors.lightGrey1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeText: {
        fontSize: Metrics.ratio(14),
        fontWeight: 'bold',
        color: Colors.white,
        textTransform: 'uppercase'
    },
    inActiveText: {
        fontSize: Metrics.ratio(14),
        fontWeight: 'bold',
        color: Colors.themeColor,
        textTransform: 'uppercase'
    },
    ordersText: {
        paddingLeft: 15,
        fontSize:Metrics.ratio(14),
        paddingTop:Metrics.ratio(2),
        paddingBottom:5,
    },
    listButtonView: {
        padding: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.themeColor
    },


    buttonView: {
        marginTop: Metrics.ratio(20),
        width: Metrics.vw * 70,
        marginHorizontal: Metrics.vw * 15,
        justifyContent: "center",
        alignItems: "center",
      },
      iconStyle: {
        fontSize: Metrics.ratio(20),
        color: Colors.themeColor,
      },
     

});