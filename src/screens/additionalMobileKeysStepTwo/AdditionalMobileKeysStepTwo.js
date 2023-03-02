//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  StatusBar,
} from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import { registerSecondary } from "../../redux/actions/index";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import * as StringUtility from "../../utils/StringUtility.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
// import ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
import RNQRGenerator from "rn-qr-generator";
import { QRreader } from "react-native-qr-decode-image-camera";
import { RNCamera } from "react-native-camera";
import Permissions, {
  PERMISSIONS,
  check,
  checkMultiple,
  request,
  RESULTS,
  openSettings,
} from "react-native-permissions";
import { useFocusEffect } from "@react-navigation/native";
import ApiConfig from "../../config";
import { getSession, storeSession } from "../../utils/Session";
import { SESSION_USER_DETAIL } from "../../utils/StringUtility";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
//#endregion "npm Dependencies "
//#region "End"

const AdditionalMobileKeysStepTwo = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const camera = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasPhotoPermission, setHasPhotoPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [isFlashOn, setIsFlashOn] = useState(0);
  const [filePath, setFilePath] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      console.log("Index.js is mount");
      if (hasCameraPermission) {
        camera?.current?.resumePreview();
      }
      return () => {
        if (hasCameraPermission) {
          camera?.current?.pausePreview();
        }
      };
    }, [])
  );

  useEffect(() => {
    const handlePermission = async () => {
      await handleCameraPermission();
    };
    handlePermission();
  }, []);

  const handleCameraPermission = async () => {
    const res = await Permissions.request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      })
    );
    if (res === RESULTS.GRANTED) {
      setHasCameraPermission(true);
    } else {
      Alert.alert(
        StringUtility.APP_NAME,
        StringUtility.ERROR_MESSAGE_PHOTO_PERMISSION_BLOCKED,
        [
          {
            text: "Ask me later camera",
            onPress: () => console.log("Ask me later pressed"),
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const handlePhotoLibPermission = async () => {
    const res = await Permissions.request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      })
    );
    if (res === RESULTS.GRANTED) {
      setHasPhotoPermission(true);
    } else {
      Alert.alert(
        StringUtility.APP_NAME,
        StringUtility.ERROR_MESSAGE_PHOTO_PERMISSION_BLOCKED,
        [
          {
            text: "Ask me later photos",
            onPress: () => console.log("Ask me later pressed"),
          },
          { text: "OK", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const readQRCodeData = async (data) => {
    const QRDATA = JSON.parse(data);
    console.log("<== readQRCodeData READ DATA ==>", QRDATA);
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    console.log("<== readQRCodeData SESSION ==>", userDetails.sessionToken);
    storeSession(
      StringUtility.SECONDARY_XPUB,
      JSON.stringify(QRDATA.secondaryXpub)
    );
    storeSession(
      StringUtility.SECONDARY_XPUB_MAINNET,
      JSON.stringify(QRDATA.mainnetSecondaryXpub)
    );

    // props.registerSecondary({
    //   qrToken: QRDATA.qr_token,
    //   sessionToken: userDetails.sessionToken,
    //   secondaryPublicKey: QRDATA.publicKey,
    // });
    dispatch({ type: SHOW_LOADER });
    const registerSecondaryResponse = await fetch(
      "https://dev.theya.us/v1/device/register_secondary_and_xpub",
      {
        // credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qr_token: QRDATA.qr_token,
          secondary_public_key: QRDATA.publicKey,
          session_token: userDetails.sessionToken,
          secondary_testnet_xpub: QRDATA.secondaryXpub,
          secondary_mainnet_xpub: QRDATA.mainnetSecondaryXpub,
        }),
      }
    );
    const registerSecondaryResult = await registerSecondaryResponse.json();
    console.log("registerSecondaryResult----", registerSecondaryResult);
    dispatch({ type: HIDE_LOADER });
    navigation.navigate("AdditionalMobileKeysStepThree");
  };

  const handleTurnhOnOffTorch = () => {
    setIsFlashOn(!isFlashOn);
  };

  const onPressUploadQRFromGallery = async () => {
    launchImageLibrary(
      {
        noData: true,
        mediaType: "mixed",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        console.log(response);

        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          if (response) {
            debugger;
            console.log(response?.assets[0].uri);
            setFilePath(response);
            const path = response?.assets[0].uri;
            // const currentQr = await QRreader(path);
            // console.log(currentQr, "currentQr");

            RNQRGenerator.detect({
              base64: `${response?.assets[0].base64}`,
            })
              .then(async (res) => {
                const { values } = res; // Array of detected QR code values. Empty if nothing found.
                readQRCodeData(values[0]);
              })
              .catch((error) =>
                console.log("Cannot detect QR code in image", error)
              );
          }
        }
      }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={"light-content"} />
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Text style={styles.title}>Scan QR from{"\n"}secondary device</Text>
        <View style={styles.cameraContainer}>
          <RNCamera
            flashMode={isFlashOn ? RNCamera.Constants.FlashMode.torch : null}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            captureAudio={true}
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={({ data }) => {
              if (isScanning) {
                setIsFlashOn(false);
                readQRCodeData(data);
                camera.current.pausePreview();
                setIsScanning(false);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.falshLightContiner}
          onPress={handleTurnhOnOffTorch}
        >
          <Image
            source={ImagePaths.FLASH_LIGHT}
            style={styles.falshLightIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadContiner}
          onPress={async () => {
            await handlePhotoLibPermission();
            onPressUploadQRFromGallery();
          }}
        >
          <Image source={ImagePaths.UPLOAD} style={styles.uploadIcon} />
          <Text style={styles.titleDesc}>Upload from gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  registerSecondary,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalMobileKeysStepTwo);
