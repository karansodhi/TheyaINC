import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as colorsCode from "../../../utils/ColorsCode";
import * as font from "../../../utils/FontFamily.js";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backArrowContainer: {
    padding: 16,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  howItWorksTitle: {
    fontSize: 26,
    color: colorsCode.colors.SECONDARY,
    textAlign: "center",
    paddingBottom: 16,
    fontWeight: "600",
    fontFamily: font.fontFamily.montserratSemiBold,
  },
  phoneImageContainer: {
    alignItems: "center",
  },
  phoneImage: {
    width: 146,
    height: 300,
  },

  contentContainer: {
    paddingLeft: 52,
    paddingRight: 52,
    paddingTop: 26,
  },
  contentData: {
    color: colorsCode.colors.SECONDARY,
    fontSize: 18,
    fontFamily: font.fontFamily.regular,
    textAlign: "left",
    lineHeight: 22,
    paddingTop: 4,
    fontWeight: "300",
  },

  continueButton: {
    height: 60,
    backgroundColor: colorsCode.colors.SECONDARY,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 52,
    marginRight: 52,
    marginTop: 26,
  },
  btnText: {
    color: colorsCode.colors.PRIMARY,
    fontSize: 20,
    fontFamily: "Lato",
    fontWeight: "700",
  },
});
