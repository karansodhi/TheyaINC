import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as colorCode from "./ColorsCode";

export const toastConfig = {
  copyToast: ({ text1, props }) => (
    <View
      style={{
        height: 40,
        width: wp(90),
        backgroundColor: "tomato",
        backgroundColor: "#202020",
        borderRadius: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Text style={{ color: colorCode.COLOR_WHITE, fontFamily: "Lato" }}>
        {text1}
      </Text>
      <Image
        resizeMode="contain"
        style={{ width: wp(4), height: wp(4) }}
        source={require("../../assets/icons/check.png")}
      />
    </View>
  ),
};
