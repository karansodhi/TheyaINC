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
    width: wp("100%"),
    height: hp("100%"),
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
  shieldIcon: {
    width: wp("15%"),
    height: wp("15%"),
    resizeMode: "contain",
    marginTop: wp("60%"),
  },
  title: {
    fontSize: wp("6.5"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: wp("30%"),
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("4.5"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("2.8"),
  },
  questionTitle: {
    fontSize: wp("5"),
    color: colorsCode.colors.SECONDARY,
    marginTop: 40,
    textAlign: "center",
    fontFamily: font.fontFamily.montserratSemiBold,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
  },
  dot: {
    width: wp("12%"),
    height: wp("5%"),
    resizeMode: "contain",
    marginTop: 10,
  },
  bottomContinueContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    justifyContent: "space-between",
    width: wp("90%"),
  },
  continueContainer: {
    width: wp("42%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.SECONDARY,
    justifyContent: "center",
    borderRadius: 5,
  },
  questionButton: {
    width: wp("88%"),
    height: hp("6%"),
    flexDirection: "row",
  },
  questionButtonTitle: {
    fontSize: wp("4.5%"),
    color: colorsCode.COLOR_PLACEHOLDER,
    fontFamily: font.fontFamily.regular,
    alignSelf: "center",
    marginLeft: 20,
    width: wp("72%"),
  },
  questionDropDownArrow: {
    width: wp("4%"),
    height: wp("4%"),
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    right: 20,
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
  continueContainerBack: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
  buttonContainer: {
    width: wp("90%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.COLOR_WHITE,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colorsCode.colors.BLACK_LIGHT_2,
  },
  input: {
    width: wp("85%"),
    height: hp("6%"),
    fontSize: wp("4.5%"),
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.regular,
    marginLeft: 20,
  },
  btnText: {
    fontSize: wp("4"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
  },
});
