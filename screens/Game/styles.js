import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        width: Dimensions.get("window").height / 2.5,
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row'
    },
    counterCount: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        fontSize: 50
    },
    counterLabel: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#bbb',
        fontSize: 20
    }
});