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
  btcConstant: {
    position: "absolute",
    width: 101,
    height: 19,
    left: 249,
    top: 20,
    letterSpacing: -0.165,
    textAlign: "right",
    fontWeight: "600",
    // backgroundColor: "#B8D6CB",
  },
  justNow: {
    width: 60,
    height: 17,
    left: 60,
    top: 40,
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.165,
    colors: colorsCode.COLOR_LIGHT_GREEN,
  },
  sent: {
    width: 39,
    height: 20,
    left: 60,
    top: 20,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.165,
    fontFamily: font.FONT_BOLD,
  },
  roundContainer: {
    width: wp("100%"),
    height: hp("16%"),
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
  roundContainer1: {
    width: 360,
    height: 80,
    left: 15,
    borderRadius: 10,
    zIndex: 10,
    marginBottom: 8,
  },
  list: {
    flex: 1,
    paddingBottom: 110,
  },
  listView: {
    paddingTop: 10,
  },
  amount: {
    fontSize: 14,
    fontFamily: font.fontFamily.semiBold,
    color: colorsCode.colors.SECONDARY,
  },
  dateAndTime: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: -0.165,
    fontFamily: font.fontFamily.regular,
    color: colorsCode.colors.SECONDARY,
  },
  itemStatus: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.165,
    fontFamily: font.fontFamily.semiBold,
    color: colorsCode.colors.SECONDARY,
  },
  sentAndReceived: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  sentAndReceived2: {
    width: 39,
    height: 39,
    left: 15,
    marginTop: 20,
    borderRadius: 10,
  },

  btnText: {
    textAlign: "center",
    marginTop: 8,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.165,
    fontFamily: font.FONT_BOLD,
  },
  btn1: {
    height: 40,
    borderRadius: 4,
    flex: 0.325,
  },
  btns: {
    height: 47,
    backgroundColor: "#DDE3E2",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 26,
    marginBottom: 16,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colorsCode.COLOR_LINEAR_GRADIENT_ONE,
  },
  subContainer: {
    flex: 1,
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
    color: colorsCode.COLOR_DARK_GREEN,
    marginTop: 15,
    fontFamily: font.FONT_BOLD,
  },
  titleDesc: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.COLOR_LIGHT_GREEN,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.FONT_REGULAR,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
  },
});
