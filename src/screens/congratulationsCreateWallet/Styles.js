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
  mainContainer: {
    flex: 1,
    backgroundColor: colorsCode.COLOR_LINEAR_GRADIENT_ONE,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
  },
  checkMark: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginTop: wp(30),
  },
  congratulations: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: 15,
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  congratulationsTitle: {
    fontSize: wp("6"),
    color: colorsCode.colors.SECONDARY,
    marginTop: 20,
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  congratulationsDesc: {
    fontSize: wp("4.2"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
  },
  congratulationsSub: {
    fontSize: wp("4.2"),
    color: colorsCode.colors.SECONDARY,
    marginTop: 6,
    textAlign: "center",
    fontFamily: font.fontFamily.light,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
  },
  doller: {
    width: wp(60),
    height: wp(60),
    resizeMode: "contain",
    position: "absolute",
    marginTop: 16,
  },
  wave: {
    width: wp(100),
    height: wp(65),
    resizeMode: "contain",
  },
  createWalletContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.PRIMARY,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  createWalletTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },

  doItLaterContainer: {
    width: wp("75%"),
    height: hp("6%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  doItLaterTitle: {
    fontSize: wp("4.5"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
});
