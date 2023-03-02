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
  checkMark: {
    width: wp("11%"),
    height: wp("11%"),
    resizeMode: "contain",
    marginTop: wp("40%"),
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
    fontFamily: font.FONT_REGULAR,
    lineHeight: hp("3%"),
  },
  titleDesc2: {
    fontSize: wp("4.2"),
    fontWeight: "300",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.FONT_REGULAR,
    lineHeight: hp("3%"),
  },

  continueContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.SECONDARY,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 50,
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },

  scanAnotherDeviceContainer: {
    width: wp("70%"),
    height: hp("6%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  scanAnotherDeviceContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },
});
