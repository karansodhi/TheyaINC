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
    width: wp("3%"),
    height: wp("3%"),
    resizeMode: "contain",
  },
  vaultContainer: {
    width: "90%",
    paddingVertical: wp("5%"),
    alignItems: "center",
    borderRadius: 10,
    marginVertical: wp("5%"),
  },
  congratulations: {
    fontSize: wp("6.8%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: wp("35%"),
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  vaultTitle: {
    fontSize: wp("6"),
    fontWeight: "800",
    color: colorsCode.colors.WHITE,
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  listTitle: {
    fontSize: wp("4.4%"),
    fontWeight: "400",
    color: colorsCode.colors.WHITE,
    fontFamily: font.fontFamily.regular,
  },
  price: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: colorsCode.colors.PRIMARY,
    fontFamily: font.fontFamily.semiBold,
    marginVertical: wp("1.0%"),
  },
  line: {
    width: "70%",
    height: 0.5,
    backgroundColor: colorsCode.colors.ORANGE_LIGHT2,
    marginVertical: wp("2.0%"),
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    paddingTop: 4,
    paddingBottom: 4,
  },
  congratulationsDesc: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    marginTop: 8,
    textAlign: "center",
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("2.8"),
  },
  doller: {
    width: wp("32%"),
    height: hp("20%"),
    resizeMode: "contain",
    marginTop: 50,
    marginBottom: 20,
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
    width: wp("70%"),
    height: hp("6%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  doItLaterTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    fontFamily: font.fontFamily.bold,
  },
  notSure: {
    fontSize: wp("5.0%"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.regular,
    marginVertical: wp("1.0%"),
  },
  trialText: {
    fontSize: wp("5.0%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.bold,
    marginVertical: wp("1.0%"),
  },
  footerTxt: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  reviewTxt: {
    fontSize: wp("4.5%"),
    fontWeight: "400",
    color: colorsCode.COLOR_LIGHT_GREEN1,
    fontFamily: font.fontFamily.regular,
    marginVertical: wp("1.0%"),
  },
  conditionTxt: {
    fontSize: wp("3.5"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.regular,
    marginVertical: wp("1.0%"),
    marginLeft: wp("1.0%"),
    marginBottom: wp(2.5),
  },
});
