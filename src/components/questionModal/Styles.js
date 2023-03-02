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
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubContainer: {
    backgroundColor: colorsCode.COLOR_WHITE,
    width: wp("100%"),
    height: hp("70%"),
    borderRadius: 25,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    fontSize: wp("6"),
    fontWeight: "700",
    color: colorsCode.colors.SECONDARY,
    marginTop: wp("10%"),
    fontFamily: font.fontFamily.montserratSemiBold,
    textAlign: "center",
  },
  titleDesc: {
    fontSize: wp("4.5"),
    fontWeight: "400",
    color: colorsCode.colors.SECONDARY,
    fontFamily: font.fontFamily.regular,
    lineHeight: hp("3%"),
    letterSpacing: 0.3,
    width: wp("85%"),
  },
  renderItemContainer: {
    // flex: 1,
    width: wp("100%"),
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },
  rightArrow: {
    width: wp("4%"),
    height: wp("4%"),
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    right: 20,
    transform: [{ rotate: "180deg" }],
  },
});
