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
  },
  titleContainer: {
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
  },
  titleDesc: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp(2.7),
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
    borderColor: colorsCode.COLOR_YELLOW,
    borderWidth: 2,
  },
  subView: {
    flexDirection: "column",
    marginLeft: 5,
  },
  stepIcon: {
    width: wp("10%"),
    height: hp("6%"),
    resizeMode: "contain",
    marginLeft: 15,
  },
  yellowRightIcon: {
    width: wp("7%"),
    height: wp("7%"),
    resizeMode: "contain",
    position: "absolute",
    right: 15,
  },
  viewTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    fontFamily: font.FONT_BOLD,
    textAlign: "left",
  },
  viewTitleDesc: {
    fontSize: wp("3.5%"),
    fontWeight: "400",
    color: colorsCode.COLOR_WHITE,
    textAlign: "center",
    fontFamily: font.FONT_REGULAR,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
    textAlign: "left",
  },
  noteContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  note: {
    fontSize: wp("4.5%"),
    color: colorsCode.COLOR_DARK_GREEN,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
  setpCard: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    borderRadius: 12,
  },
  setpCardDisable: {
    marginLeft: 46,
    marginRight: 46,
    marginTop: 8,
    borderRadius: 12,
    borderColor: colorsCode.colors.ORANGE_LIGHT,
    borderStyle: "dashed",
    borderWidth: 1.5,
    overflow: "hidden",
    padding: 0.2,
  },
  stepCardContainer: {
    height: wp(12),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCardDisable: {
    height: wp(14),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderStyle: "dashed",
    borderColor: "red",
  },
  stepCardContainerActive: {
    height: wp(50),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  setupText: {
    fontFamily: font.fontFamily.regular,
    fontSize: wp(5),
    color: colorsCode.colors.BLACK_LIGHT,
  },
  setupTextCompleted: {
    fontFamily: font.fontFamily.regular,
    fontSize: wp(5),
    color: colorsCode.colors.WHITE,
  },
  progressContainer: {
    width: wp(40),
    height: wp(3.5),
    backgroundColor: colorsCode.colors.WHITE,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 3,
    marginTop: 26,
    marginBottom: 16,
  },
  progress: {
    width: wp(38),
    height: wp(2.5),
    backgroundColor: colorsCode.colors.GOLD,
    borderRadius: 10,
  },
});
