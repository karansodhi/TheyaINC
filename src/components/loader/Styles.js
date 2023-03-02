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

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  subContainer: {
    width: wp("30%"),
    height: wp("30%"),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    backgroundColor: colorsCode.COLOR_WHITE,
  },
  loadingTitle: {
    marginTop: 15,
    fontSize: wp("4%"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.FONT_BOLD,
    textAlign: "center",
  },
});
