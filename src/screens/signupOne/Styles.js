import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/ColorsCode.js";
import { fontFamily } from "../../utils/FontFamily.js";
export default StyleSheet.create({
  right_arrow: {
    marginTop: 70,
    width: wp("6%"),
    height: wp("6%"),
    marginLeft: 20,
  },
  text1: {
    paddingTop: 36,
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    letterSpacing: -0.165,
    color: colors.SECONDARY,
    fontFamily: fontFamily.regular,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    paddingTop: 8,
    fontFamily: fontFamily.regular,
    fontSize: 19,
    lineHeight: wp(7),
    textAlign: "center",
    letterSpacing: -0.165,
    color: colors.SECONDARY,
  },
  textInput: {
    margin: wp(6),
    marginTop: wp(8),
    marginBottom: wp(2),
    padding: 15,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#FCAD14",
    borderRadius: 6,
    fontFamily: fontFamily.regular,
    fontSize: 18,
  },
  btn: {
    height: 60,
    backgroundColor: colors.PRIMARY,
    borderRadius: 6,
    alignSelf: "center",
    width: wp(89),
  },
  btnText: {
    color: colors.SECONDARY,
    fontFamily: fontFamily.semiBold,
  },
  termsAndConditions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: hp(6),
    fontFamily: fontFamily.regular,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: -0.165,
  },
});
