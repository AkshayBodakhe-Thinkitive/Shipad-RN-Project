import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { FontType } from "../../constants/FontType";
import { Colors } from "../../constants/ColorConstants";

export const DropdownStyles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  dropdown: {
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: FontType.Figtree_Medium,
    color : Colors.neutral40,
    fontWeight:'400',
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: FontType.Figtree_Regular,
    color : Colors.neutral80
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
  },
  labelStyles: {
    fontFamily: FontType.Figtree_Medium,
    color: Colors.neutral60,
    marginBottom: 4,
    fontSize: responsiveFontSize(1.6),
  },
  itemTextStyle: {
    flex:0,
    fontSize: responsiveFontSize(1.7),
    fontFamily: FontType.Figtree_Regular,
    color:Colors.neutral90,
  },
  errorText: {
    color: Colors.negative50,
    fontFamily : FontType.Figtree_Regular,
    fontSize: responsiveFontSize(1.5),
    position: 'absolute',
    bottom: '-30%',
},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: responsiveHeight(1.5),
  paddingHorizontal: responsiveWidth(4),
},
itemText: {
  fontSize: responsiveFontSize(1.8),
  fontFamily : FontType.Figtree_Regular,
  color: Colors.neutral90,
},
})