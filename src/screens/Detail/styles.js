import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../themes";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    mainView: {
        flexDirection: 'row',
        height: Metrics.ratio(40),
        borderWidth: 1,

        borderRadius: 12,
        marginHorizontal: Metrics.ratio(12),
        borderColor: Colors.borderColor
    },
    mainTopView: {
        height: Metrics.ratio(80),
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom:Metrics.ratio(15),

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ParentTopView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
    },

    partialView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: Colors.themeColor,
        flex: 1,
        backgroundColor: Colors.themeColor
    },
    halfView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flex: 1,
        backgroundColor: Colors.white
    },
    boxView: {
        width: '94%',
        borderRadius: 4,
        // paddingHorizontal: 20,
        marginHorizontal: '3%',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: Colors.white,
        paddingBottom: Metrics.ratio(10)
    },
    boxHeaderView: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: Colors.themeColor,
        width: '100%',
        height: 45,
        justifyContent: 'center',
    },
    headerText: {
        color: Colors.white,
        paddingHorizontal: 10,
    },
    itemView: {
        paddingHorizontal: 15,
        // flex:1,
        flexWrap: 'nowrap',
        alignItems: 'center',

        paddingVertical: 5,
        flexDirection: 'row',
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
    modal: {
        justifyContent: "center",
        alignItems: "center",
        elevation: 1000,
      },
      modalOverlay: {
        backgroundColor: "#d2d2d2",
        opacity: 0.7,
        height: "100%",
        width: "100%",
        position: "absolute",
      },
      modalSection1: {
        overflow: "hidden",
        elevation: 1000,
        marginBottom: 5,
        backgroundColor: '#fff',
        height: 212,
        marginHorizontal: "2%",
        borderRadius: 12,
        paddingVertical: 0,
        position: "absolute",
        bottom: 0,
        width: "98%",
        alignSelf: "center",
      },
      modalSection2: {
        overflow: "hidden",
        elevation: 1000,
        marginBottom: 5,
        backgroundColor: '#fff',
        height: 50,
        marginHorizontal: "2%",
        borderRadius: 12,
        paddingVertical: 0,
        position: "absolute",
        bottom: 0,
        width: "98%",
        alignSelf: "center",
      },
      modalSection1View: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
      },
      modalHeader: {
        height: 60,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#999',
        borderStyle: "solid",
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#733646'
      },
      modalheaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff",
      },
    
      modalButtons: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: '#999',
        borderStyle: "solid",
        flexDirection: 'row',
        borderBottomWidth: 1,
      },
      delelteModalButton: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      deleteText: {
        color: "#ea624d",
        fontSize: 14,
      },
      cancelButtonText: {
        color: "#007aff",
        fontSize: 14,
      },
});