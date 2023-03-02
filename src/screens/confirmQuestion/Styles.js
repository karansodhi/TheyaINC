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
    marginTop: wp("30"),
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
  questionIcon: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginTop: wp("35%"),
  },
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: 15,
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("3%"),
  },
  mainView: {
    flexDirection: "row",
    marginTop: 25,
    width: wp("90%"),
    height: wp("22%"),
    backgroundColor: colorsCode.COLOR_DARK_GREEN,
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
    // borderColor: colorsCode.COLOR_YELLOW,
    // borderWidth: 2,
  },
  subView: {
    flexDirection: "column",
    width: wp("78%"),
  },
  stepIcon: {
    width: wp("10%"),
    height: hp("6%"),
    resizeMode: "contain",
    marginLeft: 15,
  },
  yellowRightIcon: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
  },
  yellowIconContainer: {
    position: "absolute",
    right: 16,
  },
  viewTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: colorsCode.colors.WHITE,
    fontFamily: font.fontFamily.bold,
    textAlign: "left",
    marginLeft: 15,
  },
  viewTitleDesc: {
    fontSize: wp("3.5%"),
    fontWeight: "400",
    color: colorsCode.colors.GOLD,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
    textAlign: "left",
    marginLeft: 15,
  },
  note: {
    fontSize: wp("4.5%"),
    color: colorsCode.COLOR_DARK_GREEN,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
    position: "absolute",
    bottom: 40,
  },

  continueContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.PRIMARY,
    justifyContent: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 50,
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.fontFamily.semiBold,
  },
});
