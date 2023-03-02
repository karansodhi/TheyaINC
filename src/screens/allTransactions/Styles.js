import { StyleSheet } from "react-native";
import * as font from "../../utils/FontFamily.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  COLOR_DARK_GREEN,
  COLOR_WHITE,
  COLOR_LINEAR_GRADIENT_TWO,
} from "../../utils/ColorsCode";

export default StyleSheet.create({
  btns: {
    position: "absolute",
    width: 330,
    height: 47,
    left: 30,
    top: 160,
    backgroundColor: "#DDE3E2",
    borderRadius: 4,
  },
  btn1: {
    position: "absolute",
    width: 108,
    height: 40,
    left: 3,
    top: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  btn1Text: {
    textAlign: "center",
    marginTop: 8,
    fontWeight: "700",
    fontSize: 16,
  },
  btn2Text: {
    textAlign: "center",
    marginTop: 11,
    fontWeight: "700",
    fontSize: 16,
  },
  line: {
    width: 1,
    height: 12,
    position: "absolute",
    left: 220,
    top: 15,
    // backgroundColor: "red",
    borderRadius: 2,
  },
  btn3: {
    position: "absolute",
    width: 108,
    height: 40,
    left: 220,
    top: 1,
    // backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  list: {
    top: 311,
    left: 76,
    backgroundColor: "red",
  },
  status: {
    // position: "absolute",
    width: 71,
    height: 22,
    display: "flex",
    flexDirection: "row",
    // left: 76,
    // top: 311,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.165,
  },
  received: {
    position: "absolute",
    width: 34,
    height: 34,
    left: 30,
    top: 315,
    borderRadius: 10,
  },
});
