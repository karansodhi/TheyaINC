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
  btn: {
    position: "absolute",
    width: wp("88%"),
    height: hp("6%"),
    left: 25,
    top: 520,
    backgroundColor: colorsCode.COLOR_BLACK,
    borderRadius: 6,
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
  mainContainer: {
    flex: 1,
    backgroundColor: colorsCode.COLOR_LINEAR_GRADIENT_ONE,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
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
