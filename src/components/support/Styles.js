import { StyleSheet } from "react-native";
import * as colorsCode from "../../utils/ColorsCode";
import * as font from "../../utils/FontFamily.js";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsCode.COLOR_WHITE,
    marginTop: hp('10%'),
    marginHorizontal: wp('10%'),
  },
  text1: {
    fontFamily: font.FONT_BOLD,
    fontWeight: "700",
    fontSize: 26,
    color: colorsCode.COLOR_BLACK,
    marginTop: hp('4%'),
  },
  headset: {
    width: wp("2%"),
    height: wp("2%"),
    resizeMode: "contain",
  },
  img: {
    width: wp("9%"),
    height: hp("4%"),
    tintColor: colorsCode.COLOR_YELLOW
  },
  mainText: {
    fontFamily: font.FONT_BOLD,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
  },
  subText: {
    fontFamily: font.FONT_LIGHT,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
  },
  rightArrow: {
    width: wp("2%"),
    height: hp("1.5%"),
    alignSelf: 'center'
  },
  other: {
    color: colorsCode.COLOR_YELLOW,
    fontFamily: font.FONT_BOLD,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 17,
    marginTop: hp("5%"),
  },
  others: {

  },

  text4: {
    fontFamily: font.FONT_BOLD,
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 19,
  },
});
