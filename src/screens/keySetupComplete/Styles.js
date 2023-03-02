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
  roundContainer: {
    width: wp("100%"),
    height: hp("100%"),
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

  bottomRoundContainer: {
    width: wp("100%"),
    height: hp("45%"),
    backgroundColor: colorsCode.COLOR_WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: colorsCode.COLOR_WHITE,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: wp("15%"),
    width: wp("90%"),
    alignItems: "center",
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: wp("5%"),
    width: wp("90%"),
    alignItems: "center",
  },
  headset: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
  },
  checkMark: {
    width: wp("12%"),
    height: wp("12%"),
    resizeMode: "contain",
    marginTop: wp("15%"),
  },
  lock: {
    width: wp("3.5%"),
    height: wp("3.5%"),
    resizeMode: "contain",
    marginLeft: 5,
  },
  logo: {
    width: wp("65%"),
    height: wp("65%"),
    resizeMode: "contain",
    marginTop: wp("8%"),
  },
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    fontFamily: font.FONT_BOLD,
    textAlign: "center",
  },
  networkTitle: {
    fontSize: wp("6.5%"),
    fontFamily: font.FONT_BOLD,
    textAlign: "center",
    fontWeight: "700",
    color: colorsCode.COLOR_BLACK,
  },
  subTitle: {
    fontSize: wp("4.2%"),
    fontWeight: "600",
    color: colorsCode.COLOR_WHITE,
    textAlign: "center",
    fontFamily: font.FONT_REGULAR,
  },
  secureText: {
    fontSize: wp("3.4%"),
    color: colorsCode.COLOR_BLACK2,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: font.FONT_REGULAR,
    marginTop: wp("5%"),
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
  continueContainer: {
    width: wp("70%"),
    height: hp("6.5%"),
    backgroundColor: colorsCode.COLOR_GOLD1,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 30,
  },
  continueContainerTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_BLACK,
    textAlign: "center",
    fontFamily: font.FONT_BOLD,
  },
  doItLaterContainer: {
    width: wp("70%"),
    height: wp("3.4%"),
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
  radioContainer: {
    flexDirection: 'row',
    marginTop: hp("1%"),
  },
  radioItemContainer: {
    flexDirection: 'row',
    marginRight: wp("8.5%"),
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBtn: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: colorsCode.COLOR_BLACK,
    fontFamily: font.FONT_BOLD,
    marginLeft: wp("2.5%"),
    alignSelf: 'center'
  },
  roundBtn: {
    width: wp("5%"),
    height: hp("2.2%"),
    borderColor: colorsCode.COLOR_YELLOW,
    borderWidth: hp("0.1%"),
    borderRadius: wp('5%') + hp('2.5%') / 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  roundBtnBg: {
    width: wp("2.5%"),
    height: hp("1.2%"),
    backgroundColor: colorsCode.COLOR_YELLOW,
    borderRadius: wp('2.5%') + hp('1.2%') / 2,
    alignSelf: 'center'
  }
});
