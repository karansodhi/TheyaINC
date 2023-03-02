import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { colors } from "../../utils/ColorsCode";
import { fontFamily } from "../../utils/FontFamily";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  IS_SECONDARY_DEVICE,
  RSA_KEY,
  SESSION_USER_DETAIL,
  SESSION_USER_WALLET,
} from "../../utils/StringUtility";
import { RSA } from "react-native-rsa-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { getSession, removeSession } from "../../utils/Session";
import { SHOW_LOADER, HIDE_LOADER } from "../../redux/actions/ActionTypes";
import FingerprintScanner from "react-native-fingerprint-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation, route }) => {
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

  const checkUserVerify = async () => {
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    console.log(userDetails, "userDetails");
    const isSecondaryDevice = JSON.parse(await getSession(IS_SECONDARY_DEVICE));
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
                  enableFaceId();
                  // navigation.navigate("MyTab");
                } else {
                  navigation.navigate("CongratulationsCreateWallet");
                }
              } else {
                console.log("checkUserVerify is_verified==>", data.is_verified);
                removeSession(SESSION_USER_DETAIL);
              }
            } else {
              Toast.show({
                type: "error",
                text1: "Something went wrong!",
              });
              dispatch({ type: HIDE_LOADER });
              navigation.navigate("RegisterLogin");
            }
          })
          .catch(function (error) {
            // handle error
            // console.log(error);
            console.log("checkUserVerify error==>", error);
            dispatch({ type: HIDE_LOADER });
          });
      }
    } else {
      console.log("came in");
      navigation.navigate("RegisterLogin");
    }
  };

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

  console.log("router=", route);
  // const { id } = route.params;
  // console.log("msg from RegisterLogin=", id);
  useEffect(() => {
    setTimeout(() => {
      checkUserVerify();
      // AsyncStorage.clear();
    }, 2500);
  });

  return (
    <ImageBackground
      source={require("../../../assets/images/Rectangle-03.png")}
      style={{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      <View style={{ paddingBottom: heightPercentageToDP(10) }}>
        <Image
          source={require("../../../assets/images/logo/logo_white.png")}
          style={{
            height: widthPercentageToDP(30),
            resizeMode: "contain",
            marginBottom: 16,
          }}
        ></Image>

        <Text
          style={{
            color: colors.BLACK_LIGHT_3,
            fontSize: 18,
            textAlign: "center",
            fontFamily: fontFamily.regular,
          }}
        >
          Secure Generational Wealth {"\n"}
          With Bitcoin
        </Text>
      </View>

      <View style={{ position: "absolute", bottom: 0 }}>
        <Image
          source={require("../../../assets/images/Bg-wave.png")}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(40),
            resizeMode: "cover",
          }}
        />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
