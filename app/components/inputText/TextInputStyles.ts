import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "../../constants/ColorConstants";
import { FontType } from "../../constants/FontType";


export const TextInputStyles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        justifyContent : 'center',
    },
    inputContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: Colors.neutral20,
        backgroundColor:Colors.white,
        height: responsiveHeight(5.2),
        borderRadius: 10,
        paddingHorizontal: responsiveWidth(4),
    },
    labelStyles: {
        color: Colors.neutral60,
        marginBottom: 6,
        fontSize: responsiveFontSize(1.8),
        fontFamily:FontType.Roboto_Medium
    },
    inputBox: {
        fontFamily:FontType.Figtree_Medium,
        color: Colors.neutral80,
        fontSize: responsiveFontSize(1.9),
        fontWeight:'400',
        width: '100%',
        height: '100%',
    },
    eye: {
        position: 'absolute',
        right: 12,
        padding: 5,
        paddingLeft: 10,
        top : '40%',
    },
    icon: {
        position: 'absolute',
        right: '5%',
        top: '45%',
        padding: 5,
        paddingLeft: 10,
    },
    errorText: {
        color: Colors.negative50,
        fontFamily : FontType.Figtree_Regular,
        fontSize: responsiveFontSize(1.5),
        position: 'absolute',
        bottom: '-25%',
    }
});