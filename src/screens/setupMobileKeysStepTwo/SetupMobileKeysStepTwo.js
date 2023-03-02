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
//#endregion "npm Dependencies "
//#region "End"
const SetupMobileKeysStepTwo = ({ navigation, ...props }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"dark-content"} />
      {/* <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity> */}
      <View style={styles.subContainer}>
        <Image source={ImagePaths.ICLOUD} style={styles.checkMark} />
        <Text
          style={[styles.title, { colorsCode: colorsCode.COLOR_DARK_GREEN }]}
        >
          Your primary key{"\n"}successfully backed{"\n"}up to iCloud
        </Text>
        <Text style={styles.titleDesc}>
          You’ve done your first step. Now{"\n"}you need to finish 2 more steps
          {"\n"}to protect your wallet fully
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("SetupKeys");
          }}
        >
          <Text style={styles.continueContainerTitle}>
            Continue to next step
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
)(SetupMobileKeysStepTwo);
