import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../themes";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    mainView: {
        width: '100%',
        height: 60,
        justifyContent: "center",
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    boxView: {
        width: '100%',
        height: 45,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white
    }

});