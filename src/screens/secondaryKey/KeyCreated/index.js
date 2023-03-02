//#region "Start"
//#region "React Native Dependencies "
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import styles from "./Styles";
import * as colorsCode from "../../../utils/ColorsCode";
import * as ImagePaths from "../../../utils/ImagePaths.js";
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SetupMobileKeysStepOne = ({ navigation, ...props }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} />
      {/* <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity> */}
      <View style={styles.subContainer}>
        <LinearGradient
          start={{ x: 1.5, y: -2 }}
          end={{ x: 1.6, y: 1.1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={styles.roundContainer}
        >
          <Image source={ImagePaths.ORANGE_CHECK} style={styles.checkMark} />
          <Text style={styles.title}>
            {`Successfully created\na secondary mobile\nkey with this device`}
          </Text>
          <Text style={styles.titleDesc}>
            Now you can generate a QR code{"\n"} with this mobile key and this{" "}
            {"\n"}device can be directly connect to {"\n"}your primary device
          </Text>
        </LinearGradient>

        <Text style={[styles.title2, { marginTop: 50 }]}>How to connect?</Text>
        <Text style={styles.titleDesc2}>
          Get a QR code and scan it with {"\n"}your primary device. And {"\n"}
          connect both device instantly
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            setIsShowModal(false);
            navigation.navigate("QRCodeGenerate");
          }}
        >
          <Text style={styles.continueContainerTitle}>Get a QR code</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupMobileKeysStepOne);
