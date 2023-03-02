//#region "Start"
//#region "React Native Dependencies "
import { StyleSheet } from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import * as colorsCode from "../../../utils/ColorsCode";
import * as font from "../../../utils/FontFamily.js";
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
  back: {
    width: wp("11%"),
    height: wp("11%"),
    position: "absolute",
    top: 50,
    left: 15,
    justifyContent: "center",
    zIndex: 1,
  },
  backIcon: {
    width: wp("6%"),
    height: wp("6%"),
    resizeMode: "contain",
  },
  roundContainer: {
    width: wp("100%"),
    height: hp("55%"),
    backgroundColor: colorsCode.COLOR_WHITE,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: colorsCode.COLOR_WHITE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    alignItems: "center",
  },
  checkMark: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginTop: wp("35%"),
  },
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.WHITE,
    marginTop: 15,
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.colors.WHITE,
    marginTop: 16,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("2.8"),
    letterSpacing: 0.3,
  },
  title2: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: 15,
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc2: {
    fontSize: wp("4.5%"),
    fontWeight: "300",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("2.7"),
    letterSpacing: 0.3,
  },
  continueContainer: {
    width: wp("85%"),
    height: hp("7.3%"),
    backgroundColor: colorsCode.colors.SECONDARY,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: hp(10),
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
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
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubContainer: {
    backgroundColor: colorsCode.COLOR_WHITE,
    width: wp("90%"),
    height: hp("60%"),
    borderRadius: 25,
    alignItems: "center",
  },
});
