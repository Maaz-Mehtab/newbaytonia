import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../themes";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    mainView: {
        width: '90%',
        height: 60,
        marginHorizontal: '5%',
        justifyContent: "center",
        // paddingHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxView: {
        width: '90%',
        borderRadius: 4,
        // paddingHorizontal: 20,
        marginHorizontal: '5%',
        borderColor: Colors.borderColor,
        borderWidth: 1,
        marginBottom:20,
        backgroundColor: Colors.white
    },
    buttonIconView: {
        height: 35,
        width: 50,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 4,
        backgroundColor: Colors.themeColor
    },
    itemView: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    boxHeaderView: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: Colors.themeColor,
        width: '100%',
        height: 45,
        // justifyContent: 'center',
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    headerText: {
        color: Colors.white,
        paddingHorizontal: 10,
    }

});