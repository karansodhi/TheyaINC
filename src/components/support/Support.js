import { View, Text, Image, Pressable } from "react-native";
import Styles from "./Styles";
import * as ImagePaths from "../../utils/ImagePaths.js";
import { useNavigation } from "@react-navigation/native";

const data = [
  // {
  //   mainText: "Send us an email",
  //   subText: "Expect response in a day",
  // },
  // {
  //   mainText: "Reaise a ticket",
  //   subText: "Get a solution easily",
  // },
];
const others = [
  {
    mainText: "Terms of use",
  },
  {
    mainText: "Privacy policy",
  },
  // {
  //   mainText: "Frequently asked questions",
  // },
];
const SupportDetails = ({ mainText, subText }) => {
  return (
    <View
      style={{
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={Styles.mainText}>{mainText}</Text>
        <Text style={Styles.subText}>{subText}</Text>
      </View>
      <View style={{}}>
        <Image
          style={Styles.rightArrow}
          source={require("../../../assets/icons/right_arrow.png")}
        />
      </View>
    </View>
  );
};
const RenderOthers = ({ mainText, index }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      key={index}
      onPress={() => navigation.navigate("WebView", { mainText })}
    >
      <View>
        <Text style={Styles.text4}>{mainText}</Text>
      </View>
      <Image
        style={Styles.rightArrow}
        source={require("../../../assets/icons/right_arrow.png")}
      />
    </Pressable>
  );
};
const Support = () => {
  return (
    <View style={Styles.container}>
      <Image style={Styles.img} source={ImagePaths.HEADSET} />
      <Text style={Styles.text1}>Support</Text>
      <View style={{ marginTop: 10 }}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <SupportDetails mainText={item.mainText} subText={item.subText} />
            </View>
          );
        })}
      </View>

      {/* <Text style={ Styles.other }>Others</Text> */}
      <View style={Styles.others}>
        {others.map((item, index) => {
          return (
            <View key={index}>
              <RenderOthers mainText={item.mainText} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Support;
