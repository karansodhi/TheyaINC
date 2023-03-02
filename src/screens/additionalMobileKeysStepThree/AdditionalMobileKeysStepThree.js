//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//#endregion "npm Dependencies "
//#region "End"

const AdditionalMobileKeysStepThree = ({ navigation, ...props }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"dark-content"} />
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Image source={ImagePaths.SHIELD} style={styles.checkMark} />
        <Text style={styles.title}>Connect your{"\n"}secondary device</Text>
        <Text style={styles.titleDesc}>
          Your secondary device will be{"\n"}linked after verifying the QR,
          {"\n"}hence you can use it as an{"\n"}additional mobile key
        </Text>

        <Image
          source={ImagePaths.ORANGE_QUESTION}
          style={[styles.checkMark, { marginTop: wp("20%") }]}
        />
        <Text style={styles.title}>What next?</Text>
        <Text style={styles.titleDesc2}>
          Please confirm connecting this{"\n"}secondary device with your{"\n"}
          primary account
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("AdditionalMobileKeysStepFour");
          }}
        >
          <Text style={styles.continueContainerTitle}>Confirm connecting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanAnotherDeviceContainer}
          onPress={() => {
            navigation.navigate("AdditionalMobileKeysStepOne");
          }}
        >
          <Text style={styles.scanAnotherDeviceContainerTitle}>
            Scan another device
          </Text>
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
)(AdditionalMobileKeysStepThree);
