const { default: LinearGradient } = require("react-native-linear-gradient");
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, connect } from "react-redux";
import { HIDE_LOADER, SHOW_LOADER } from "../../../redux/actions/ActionTypes";
import { getValueFromKeyChain, setupMobileKey } from "../../../utils/BtcFunc";
import * as colorsCode from "../../../utils/ColorsCode";
import styles from "./Styles";

const HowItWorks = ({ navigation, route, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllKeys = async () => {
      let credentials = await getValueFromKeyChain();
      if (credentials) {
        console.log(
          "ALL KEY credentials===>",
          JSON.parse(credentials?.password)
        );
      }
    };

    getAllKeys();
  });

  const doAction = () => {
    dispatch({ type: SHOW_LOADER });
    setTimeout(async () => {
      let publicKey = await setupMobileKey(true);
      let mainnetPublicKey = await setupMobileKey(false);
      dispatch({ type: HIDE_LOADER });
      navigation.push("KeyCreated");
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={colorsCode.colors.GRADIENT}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => navigation.pop()}
          >
            <Image
              resizeMode="contain"
              style={styles.backArrow}
              source={require("../../../../assets/icons/back.png")}
            />
          </TouchableOpacity>
          <Text style={styles.howItWorksTitle}>How it works?</Text>
          <View style={styles.phoneImageContainer}>
            <Image
              style={styles.phoneImage}
              source={require("../../../../assets/images/intro-screen-1.png")}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.contentData}>
              {`1. Create a mobile key on this\n   device`}
            </Text>
            <Text style={styles.contentData}>
              {`2. Create and show a QR code with\n     this mobile key`}
            </Text>
            <Text style={styles.contentData}>
              {`3. Use your Primary device to scan\n    this code`}
            </Text>
            <Text style={styles.contentData}>
              {`4. Your primary device will be\n    connected with this secondary\n    device`}
            </Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={doAction}>
            <Text style={styles.btnText}>Create a mobile key</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const mapStateToProps = (state) => ({
  stateData: state.setupkeys,
});

export default connect(mapStateToProps)(HowItWorks);
