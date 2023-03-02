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
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: wp("30%"),
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("5%"),
    fontWeight: "300",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "left",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("3%"),
    // letterSpacing: 0.3,
  },
  titleDescContainer: {
    width: wp("60%"),
    marginTop: 15,
  },
  mobileImage: {
    marginTop: 20,
    width: wp("40%"),
    height: hp("32%"),
    resizeMode: "contain",
  },
  continueContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.SECONDARY,
    justifyContent: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 50,
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },
});
