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
    },
    bestContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bestIcon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    bestLabel: {
        fontFamily: 'dogbyte',
        color: '#bbb',
        fontSize: 25,
        marginTop: 2.5,
    },
    pausedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pausedText: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        marginTop: 20,
        fontSize: 60,
    },
    pausedIcon: {
        width: 75,
        height: 75
    },
    exitIcon: {
        marginTop: 20,
        width: 90,
        height: 45
    }
});