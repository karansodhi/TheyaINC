import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import Button from "../../../button/button";
import Styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import {
  IS_SECONDARY_DEVICE,
  PRIMARY_XPUB,
  RECOVERY_XPUB,
  RSA_KEY,
  SECONDARY_XPUB,
  SESSION_USER_DETAIL,
  SESSION_USER_WALLET,
} from "../../utils/StringUtility";
import { getSession, removeSession, storeSession } from "../../utils/Session";
import { connect, useDispatch } from "react-redux";
import { SHOW_LOADER, HIDE_LOADER } from "../../redux/actions/ActionTypes";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import Toast from "react-native-toast-message";
import { getValueFromKeyChain } from "../../utils/BtcFunc";
import { RSA } from "react-native-rsa-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FingerprintScanner from "react-native-fingerprint-scanner";

const RegisterLogin = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const enableFaceId = async () => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        // this.setState({biometryType});
        if (biometryType == "Face ID") {
          FingerprintScanner.authenticate({}).then(() => {
            navigation.navigate("MyTab");
          });
        } else {
          Alert.alert("Face ID failed, kindly try again", [
            {
              text: "OK",
              onPress: () => enableFaceId(),
            },
            {
              text: "Cancel",
              onPress: () => console.log("cancel pressed"),
              style: "cancel",
            },
          ]);
        }
      })
      .catch((error) => console.log("isSensorAvailable error => ", error));
  };

  // console.log("router=", route);
  // const { id } = route.params;
  // console.log("msg from RegisterLogin=", id);
  const handlePress = () => {
    navigation.navigate("SignupOne");
  };

  useEffect(() => {
    // initialClear();

    dispatch({ type: HIDE_LOADER });
    const checkUserVerify = async () => {
      const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
      console.log(userDetails, "userDetails");
      const isSecondaryDevice = JSON.parse(
        await getSession(IS_SECONDARY_DEVICE)
      );
      if (userDetails) {
        if (isSecondaryDevice) {
          dispatch({ type: SHOW_LOADER });
          initalSecondary();
        } else {
          dispatch({ type: SHOW_LOADER });
          console.log("DETAILS", userDetails);
          const URL =
            "https://dev.theya.us/v1/post_login?session_token=" +
            userDetails.sessionToken +
            "&user_id=" +
            userDetails.userID;
          console.log("checkUserVerify URL==>", URL);

          axios
            .get(URL)
            .then(async function (response) {
              // handle success
              // console.log(response);
              if (response.status == 200) {
                // await removeSession(SESSION_USER_WALLET)

                const data = response.data;
                console.log("GcheckUserVerify response==>", data);
                if (data.is_verified) {
                  dispatch({ type: HIDE_LOADER });
                  const wallet = JSON.parse(
                    await getSession(SESSION_USER_WALLET)
                  );
                  if (wallet) {
                    // enableFaceId();
                    navigation.navigate("MyTab");
                  } else {
                    navigation.navigate("CongratulationsCreateWallet");
                  }
                } else {
                  console.log(
                    "checkUserVerify is_verified==>",
                    data.is_verified
                  );
                  removeSession(SESSION_USER_DETAIL);
                }
              } else {
                Toast.show({
                  type: "error",
                  text1: "Something went wrong!",
                });
                dispatch({ type: HIDE_LOADER });
              }
            })
            .catch(function (error) {
              // handle error
              // console.log(error);
              console.log("checkUserVerify error==>", error);
              dispatch({ type: HIDE_LOADER });
            });
        }
      }
    };
    checkUserVerify();
  }, []);

  const initalSecondary = async () => {
    const getChallengeResponse = await fetch(
      "https://dev.theya.us/v1/device/get_challenge",
      {
        method: "GET",
        // credentials: "include",
      }
    );
    const getChallengeResult = await getChallengeResponse.json();

    const stringRASKey = await getSession(RSA_KEY);
    let currentKey = stringRASKey ? JSON.parse(stringRASKey) : {};

    console.log(currentKey, "currentKey");

    const signature = await RSA.signWithAlgorithm(
      getChallengeResult.challenge,
      currentKey.private,
      RSA.SHA256withRSA
    );

    const publicKey = currentKey.public
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .trim();

    const registerDeviceResponse = await fetch(
      "https://dev.theya.us/v1/device/register",
      {
        // credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge: getChallengeResult.challenge,
          public_key: publicKey,
          signature: signature,
        }),
      }
    );
    const registerDeviceResult = await registerDeviceResponse.json();
    console.log("requestQRCode registerDeviceResult----", registerDeviceResult);

    const loginResponse = await fetch("https://dev.theya.us/v1/device/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_id: registerDeviceResult.device_id,
        challenge_id: getChallengeResult.challenge,
        signature: signature,
      }),
    });

    const loginResult = await loginResponse.json();
    dispatch({ type: HIDE_LOADER });
    enableFaceId();
  };

  const initialClear = async () => {
    await Keychain.resetGenericPassword();
    await AsyncStorage.clear();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <ImageBackground
        source={require("../../../assets/images/Rectangle-3.png")}
      />
      {/* Heading */}
      <View style={{ marginTop: 10 }}>
        <Image
          source={require("../../../assets/images/logo/logo_black.png")}
          style={Styles.logo}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={Styles.text2}>
          Secure Bitcoin Self-custody{"\n"}
          without seed phrases.
        </Text>
      </View>

      {/* Locker and wave */}
      <View>
        <Image
          source={require("../../../assets/icons/lock_3.png")}
          style={Styles.locker}
        />
        <Image
          source={require("../../../assets/icons/wave_3.png")}
          style={Styles.wave}
        />
      </View>

      <View style={Styles.bottomContainer}>
        {/* Get started Button */}
        <Button style={Styles.btn} title="Get started" onPress={handlePress} />

        {/* key text */}

        <TouchableOpacity
          onPress={() => navigation.navigate("HowItWorks")}
          style={Styles.secondaryBtn}
        >
          <Text style={Styles.key}>Setup my secondary key</Text>
          <Image
            resizeMode="contain"
            source={require("../../../assets/icons/right_arrow.png")}
            style={Styles.right_arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);
// export default RegisterLogin;
