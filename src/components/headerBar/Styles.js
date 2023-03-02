import { StyleSheet } from "react-native";
import * as font from "../../utils/FontFamily.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colorsCode from "../../utils/ColorsCode";

export default StyleSheet.create({
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
  title: {
    fontSize: wp("6.5%"),
    fontWeight: "700",
    color: colorsCode.COLOR_WHITE,
    fontFamily: font.FONT_BOLD,
    textAlign: "center",
  },
});
