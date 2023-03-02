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
    fontSize: wp("4"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp(2.5),
    letterSpacing: 0.3,
  },
  stepTitle: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: hp(8),
    marginBottom: hp(2.5),
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3.5),
    width: wp("80%"),
  },
  subView: {
    flexDirection: "column",
    marginLeft: 8,
  },
  stepIcon: {
    width: wp(8),
    height: hp(4),
    resizeMode: "contain",
  },
  viewTitle: {
    fontSize: wp(4.5),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.bold,
    textAlign: "left",
  },
  viewTitleDesc: {
    fontSize: wp("3.8"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    paddingTop: 2,
    letterSpacing: 0.3,
    textAlign: "left",
  },

  continueContainer: {
    width: wp("80"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.colors.SECONDARY,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: hp(6),
  },
  continueContainerTitle: {
    fontSize: wp(5),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },
});
