import { StyleSheet } from "react-native";
import * as font from "../../utils/FontFamily.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/ColorsCode.js";
export default StyleSheet.create({
  text1: {
    width: 120,
    height: 36,
    resizeMode: "contain",
  },
  text2: {
    fontFamily: font.fontFamily.regular,
    fontWeight: "400",
    fontSize: wp("4.5%"),
    lineHeight: 22,
    textAlign: "center",
    color: colors.SECONDARY,
  },
  btn: {
    width: wp("86%"),
    height: hp("6.5%"),
    backgroundColor: "#000",
    borderRadius: 6,
    fontSize: 14,
  },
  logo: {
    marginTop: 70,
    alignSelf: "center",
    width: wp(35),
    height: wp(35),
    resizeMode: "contain",
  },
  wave: {
    width: wp(100),
    height: wp(70),
    resizeMode: "contain",
    position: "absolute",
    top: hp(22),
  },
  locker: {
    marginTop: hp(5),
    height: wp(60),
    resizeMode: "contain",
    alignSelf: "center",
  },
  right_arrow: {
    height: 14,
    marginTop: 3,
  },
  key: {
    fontFamily: font.FONT_REGULAR,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.165,
    color: colors.SECONDARY,
  },
  bottomContainer: {
    position: "absolute",
    bottom: hp(5),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  secondaryBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingLeft: 30,
  },
});
