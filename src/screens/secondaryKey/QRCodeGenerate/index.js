import { Image, Text, View, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { RSA } from "react-native-rsa-native";
import LinearGradient from "react-native-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import Styles from "./Styles";

import * as colorsCode from "../../../utils/ColorsCode";
import * as ImagePaths from "../../../utils/ImagePaths.js";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { HIDE_LOADER, SHOW_LOADER } from "../../../redux/actions/ActionTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getValueFromKeyChain } from "../../../utils/BtcFunc";
import { storeSession } from "../../../utils/Session";
import {
  IS_SECONDARY_DEVICE,
  SESSION_USER_DETAIL,
  RSA_KEY,
} from "../../../utils/StringUtility";

const QRCodeGenerate = ({ navigation, route }) => {
  const [qrCodeValue, setQrCodeValue] = useState({});
  const [loading, setLoading] = useState(true);
  const [QRDetails, setQRDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getPublicPrivatKeys();
  }, []);

  const getPublicPrivatKeys = async () => {
    let credentials = await getValueFromKeyChain();
    if (credentials) {
      dispatch({ type: HIDE_LOADER });
      requestQRCode(JSON.parse(credentials?.password));
    }
  };

  const requestQRCode = async (allKeys) => {
    console.log("ALL KEY mnemonic===>", allKeys);
    // console.log("ALL KEY privateKey===>", allKeys.privateKey);
    // console.log("ALL KEY publicKey===>", allKeys.publicKey);

    setLoading(true);
    dispatch({ type: SHOW_LOADER });
    const getChallengeResponse = await fetch(
      "https://dev.theya.us/v1/device/get_challenge",
      {
        method: "GET",
        // credentials: "include",
      }
    );
    const getChallengeResult = await getChallengeResponse.json();
    console.log("requestQRCode getChallengeResult----", getChallengeResult);

    const keys = await RSA.generate();
    const publicKey = keys.public
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .trim();

    const signature = await RSA.signWithAlgorithm(
      getChallengeResult.challenge,
      keys.private,
      RSA.SHA256withRSA
    );
    console.log("requestQRCode signature----", signature);

    try {
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
      console.log(
        "requestQRCode registerDeviceResult----",
        registerDeviceResult
      );

      const loginResponse = await fetch(
        "https://dev.theya.us/v1/device/login",
        {
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
        }
      );

      const loginResult = await loginResponse.json();
      console.log("requestQRCode loginResult----", loginResult);

      const getQRResponse = await fetch(
        "https://dev.theya.us/v1/device/get_qr_code",
        {
          method: "GET",
          // credentials: "include",
        }
      );

      const getQRResult = await getQRResponse.json();
      console.log("requestQRCode getQRResult----", getQRResult);
      const getQRResultCopy = getQRResult;
      getQRResultCopy.publicKey = publicKey;
      getQRResultCopy.secondaryXpub = allKeys.publicKey;
      getQRResultCopy.mainnetSecondaryXpub = allKeys.mainnetPublicKey;
      console.log(getQRResultCopy, "getQRResultCopy");
      setQrCodeValue(getQRResultCopy);
      setLoading(false);
      dispatch({ type: HIDE_LOADER });

      var id = setInterval(async () => {
        const isSecondaryDeviceRegisteredResponse = await fetch(
          "https://dev.theya.us/v1/device/is_secondary_device_registered",
          {
            // credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              qr_token: getQRResult?.qr_token,
            }),
          }
        );
        const isSecondaryDeviceRegisteredResult =
          await isSecondaryDeviceRegisteredResponse.json();
        console.log(
          "isSecondaryDeviceRegisteredResult----",
          isSecondaryDeviceRegisteredResult
        );

        if (isSecondaryDeviceRegisteredResult?.is_authenticated) {
          const userDetails = {
            userID: isSecondaryDeviceRegisteredResult.user_id,
            sessionToken: isSecondaryDeviceRegisteredResult.session_token,
            sessionJwt: isSecondaryDeviceRegisteredResult.session_jwt,
          };

          //store user id and session tolen in session
          storeSession(SESSION_USER_DETAIL, JSON.stringify(userDetails));
          storeSession(IS_SECONDARY_DEVICE, "true");
          storeSession(RSA_KEY, JSON.stringify(keys));
          navigation.navigate("SecondaryPairedStepOne");
          clearInterval(id);
        }
      }, 5000);
    } catch (error) {
      console.log("requestQRCode err---", error);
      setLoading(false);
      dispatch({ type: HIDE_LOADER });
    }
  };

  return (
    <LinearGradient
      colors={[
        colorsCode.COLOR_LINEAR_GRADIENT_ONE,
        colorsCode.COLOR_LINEAR_GRADIENT_TWO,
      ]}
      style={Styles.mainContainer}
    >
      <StatusBar barStyle={"dark-content"} />
      <TouchableOpacity
        style={Styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={Styles.backIcon} />
      </TouchableOpacity>
      <View style={Styles.subContainer}>
        <Text style={Styles.title}>
          Scan this QR with{"\n"} your primary device
        </Text>
        <Text style={Styles.titleDesc}>
          Scan this code to link this mobile key with your primary device
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: 40,
          }}
        >
          {loading ? (
            <Text>Loading</Text>
          ) : (
            <QRCode
              value={JSON.stringify(qrCodeValue)}
              size={250}
              // backgroundColor="transparent"
            />
          )}
        </View>
        {!loading && (
          <View style={[Styles.subContainer, { top: 60 }]}>
            <Text style={Styles.titleDesc}>Valid for one scanning</Text>

            <Text style={Styles.bottomTitleDesc}>Share this code</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

// export default QRCodeGenerate;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeGenerate);
