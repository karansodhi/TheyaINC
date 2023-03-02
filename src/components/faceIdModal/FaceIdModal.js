import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import Modal from "react-native-modal";
import styles from "./Styles";
import * as ImagePaths from "../../utils/ImagePaths.js";
import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import FingerprintScanner from 'react-native-fingerprint-scanner';


const FaceIdModal = ({ visible, setModalVisible,navigation }) => {

  const enableFaceId = async () => {
    FingerprintScanner.isSensorAvailable()
    .then((biometryType) => {
      // this.setState({biometryType});
      if(biometryType=='Face ID')
    {
      FingerprintScanner.authenticate({}).then(() => {
        setModalVisible(!visible);
        // navigation.navigate("SubscribtionScreen");
      })
    }
    else
    {
        Alert.alert("Face ID failed, kindly try again",[
          {
            text: "OK",
            onPress: () => enableFaceId(),
            style:"cancel"
          }
        ])
    }
    })
    .catch((error) => console.log('isSensorAvailable error => ', error));
    // if (biometryType === BiometryTypes.FaceID) {
    //   //do something face id specific
    //   console.log("FaceID is supported");
    //   // console.log("success", success);
    //   setModalVisible(!visible);
    //   console.log("closing modal");
    //   navigation.navigate("SubscribtionScreen");
    // }
    // TouchID.authenticate("to demo this react-native component")
    // .then((success) => {
    // Success code
    // console.log("success", success);
    // props.setModalVisible(!props.modalVisible);
    // navigation.navigate("SubscribtionScreen");
    // })
    // .catch((error) => {
    //   // Failure code
    //   navigation.navigate("SubscribtionScreen");
    //   console.log("error", error);
    // });
  };
  return (
    <Modal
      isVisible={visible}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => {
          setModalVisible(!visible);
        }}
      >
        <View style={styles.subContainer}>
          <Image source={ImagePaths.FACEID} style={styles.faceMark} />
          <Text style={styles.title}>
            Enable Face ID to {"\n"} access Theya
          </Text>
          <Text style={styles.description}>
            You can use face ID or passcode {"\n"} to access Theya everytime{" "}
            {"\n"} instead of logging in with {"\n"} password
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Enable Face ID",
                "You can disable it back from settings page",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "Enable", onPress: () => enableFaceId() },
                ]
              ) } 
            style={styles.createWalletContainer}
          >
            <Text style={styles.createWalletTitle}>Enable Face ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>  setModalVisible(!visible)}
            style={styles.doItLaterContainer}
          >
            <Text style={styles.doItLaterTitle}>May be later</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FaceIdModal;
