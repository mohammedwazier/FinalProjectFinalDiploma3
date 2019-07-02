/*
 * Main Styling for Display Section
 */

import { StyleSheet } from 'react-native';

const globalVariable = {
    logoFont: 30,
    mainFont: 14,
    mainSmallerFont: 12,
    mainBiggerFont: 18,
    mainColor: 'orange',
};

const style = StyleSheet.create({
    mainContainer: {
        borderColor: '#000',
        flex: 1,
        // flexDirection: 'row',
        width: '100%',
        marginTop: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        width: '100%',
    },
    container: {
        padding: 30,
        borderColor: '#000',
        width: '100%',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mainImgBackground: {
        flex: 1,
        width: '100%',
        height: 750,
        resizeMode: 'cover',
    },
    imageLogo: {
        width: 200,
        height: 130,
    },
    homeDesc: {
        marginTop: 30,
        fontSize: globalVariable.mainFont,
    },
    header: {
        width: '100%',
        padding: 30,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'Helvetica',
        letterSpacing: 5,
        fontSize: globalVariable.logoFont,
    },
    splashScreen: {
        width: '100%',
        padding: 25,
        backgroundColor: '#2f9b5b',
    },

    btnHome: {
        backgroundColor: '#23b11b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 200,
        // top: 130,
        marginTop: 30,
        padding: 15,
    },
    textHome: {
        color: '#fff',
    },
    btnLogReg: {
        backgroundColor: '#23b11b',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 200,
        padding: 15,
        marginTop: 10,
    },
    headerLogReg: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 120,
        padding: 10,
        marginTop: 30,
    },
});

export default style;

// module.exports = {
// 	style
// };
