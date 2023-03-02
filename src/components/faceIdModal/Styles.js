//#region "Start"
//#region "React Native Dependencies "
import { StyleSheet } from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import * as colorsCode from "../../utils/ColorsCode";
import * as font from "../../utils/FontFamily.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//#endregion "npm Dependencies "

//#region "End"

export default StyleSheet.create({
  mainContainer: {},
  subContainer: {
    backgroundColor: colorsCode.COLOR_WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 26,
  },
  faceMark: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginTop: wp("12%"),
    marginBottom: wp("5%"),
  },
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_DARK_GREEN,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
  description: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.COLOR_LIGHT_GREEN1,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
    letterSpacing: 0.3,
  },
  createWalletContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.COLOR_YELLOW,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  createWalletTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },

  doItLaterContainer: {
    width: wp("70%"),
    height: hp("6%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  doItLaterTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_DARK_GREEN,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
});
