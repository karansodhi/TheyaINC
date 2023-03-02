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
    backgroundColor: colorsCode.colors.SECONDARY,
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
    tintColor: colorsCode.COLOR_WHITE,
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    marginTop: wp("30%"),
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("4.5"),
    color: colorsCode.colors.WHITE,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
  },
  cameraContainer: {
    width: wp("85%"),
    height: hp("50%"),
    backgroundColor: colorsCode.COLOR_WHITE,
    borderRadius: 25,
    borderColor: colorsCode.colors.PRIMARY,
    borderWidth: 2,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  preview: {
    backgroundColor: colorsCode.COLOR_WHITE,
    width: wp("85%"),
    height: hp("50%"),
  },
  falshLightContiner: {
    marginTop: 50,
    backgroundColor: colorsCode.colors.PRIMARY,
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("8%"),
    justifyContent: "center",
    alignItems: "center",
  },
  falshLightIcon: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
  },
  uploadContiner: {
    marginTop: 30,
    flexDirection: "row",
  },
  uploadIcon: {
    width: wp("6%"),
    height: wp("6%"),
    resizeMode: "contain",
    marginRight: 10,
  },
});
