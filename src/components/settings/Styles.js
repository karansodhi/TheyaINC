
import { StyleSheet } from "react-native";

import * as font from "../../utils/FontFamily.js";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  container:{
    width: wp("90%"),
    height: hp("6%"),
    marginTop: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  commingSoon: {
    width: wp("21%"),
    height: hp("1.8%"),
    alignSelf: 'center',
    marginLeft: wp('2%')
  },
  icon1: {
    alignSelf: 'center',
    width: wp("5%"),
    height: hp("3%"),
    marginRight: wp('4%')
  },
  mainText: {
    fontFamily: font.FONT_BOLD,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.165,
  },
  subText: {
    fontFamily: font.FONT_LIGHT,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.165,
  },
  rightArrow: {
    width: wp("2%"),
    height: hp("1.5%"),
    marginTop: hp("0.5%"),
  },
  versionText: {
    fontFamily: font.FONT_BOLD,
    fontSize: 18,
    lineHeight: 22,
    textAlign: "right",
    letterSpacing: -0.165,
  },
});
