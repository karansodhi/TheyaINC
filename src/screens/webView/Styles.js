import { StyleSheet } from "react-native";
import * as colorsCode from "../../utils/ColorsCode";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as font from "../../utils/FontFamily.js";

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colorsCode.COLOR_LINEAR_GRADIENT_ONE,
  },
  header:{
    marginTop: wp("12%"),
    marginHorizontal: wp("5%"),
    flexDirection: 'row',
    marginBottom: wp("4%"),
  },
  headerText:{
    fontSize: wp("8%"),
    fontWeight: "700",
    color: colorsCode.COLOR_DARK_GREEN,
    fontFamily: font.FONT_BOLD,
    textAlign: "center",
    marginLeft: wp('14%')
  },
  rightArrow: {
    width: wp("6%"),
    height: wp("6%"),
    resizeMode: "contain",
  },
});
