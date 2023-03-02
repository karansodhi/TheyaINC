//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
//#endregion "npm Dependencies "
//#region "End"

const AdditionalMobileKeysStepOne = ({ navigation, ...props }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Text style={styles.title}>How it works?</Text>
        <Image source={ImagePaths.INTRO_MOBILE} style={styles.mobileImage} />
        <View style={styles.titleDescContainer}>
          <Text style={styles.titleDesc}>
            1. Download Theya app on your{"\n"}secondary device{"\n"}
            2. Choose Setup this device as{"\n"}additional key{"\n"}
            3. Create a mobile key with your{"\n"}secondary device{"\n"}
            4. Generate a QR code to link with{"\n"}your primary device{"\n"}
            5. Scan it with your primary device
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("AdditionalMobileKeysStepTwo");
          }}
        >
          <Text style={styles.continueContainerTitle}>Continue</Text>
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
)(AdditionalMobileKeysStepOne);
