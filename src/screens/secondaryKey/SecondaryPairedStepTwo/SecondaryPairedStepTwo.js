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
import * as colorsCode from "../../../utils/ColorsCode";
import * as ImagePaths from "../../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

//#endregion "npm Dependencies "
//#region "End"
const SecondaryPairedStepTwo = ({ navigation, ...props }) => {
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
        <Image source={ImagePaths.ICLOUD} style={styles.checkMark} />
        <Text style={[styles.title]}>
          Your primary key{"\n"}successfully backed up to{"\n"}iCloud
        </Text>
        <Text style={styles.titleDesc}>
          You’ve connected both of your{"\n"}devices together for approval.
          {"\n"}Now you can approve{"\n"}transactions initiated from your{"\n"}
          primary device.
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("MyTab");
            // Toast.show({
            //   type: "error",
            //   text1: "Device paired successfully.",
            // });
          }}
        >
          <Text style={styles.continueContainerTitle}>Explore Vault</Text>
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
)(SecondaryPairedStepTwo);
