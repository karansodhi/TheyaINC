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

const AdditionalMobileKeysStepFour = ({ navigation, ...props }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} />
      <View style={styles.subContainer}>
        <LinearGradient
          start={{ x: 1.5, y: -2 }}
          end={{ x: 1.6, y: 1.1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={styles.roundContainer}
        >
          <Image source={ImagePaths.ORANGE_CHECK} style={styles.checkMark} />
          <Text style={styles.title}>
            {`Successfully linked\nyour secondary\ndevice as an\nadditional mobile\nkey`}
          </Text>
          <Text style={styles.titleDesc}>
            {`You’ve completed this setup\nusing your alternate iPhone and\n you can proceed to the next\nstep.`}
          </Text>
        </LinearGradient>

        <Text style={[styles.title2, { marginTop: 50 }]}>
          You’re one step ahead
        </Text>
        <Text style={styles.titleDesc2}>
          Now you can set up recovery key{"\n"}by adding some recovery{"\n"}
          questions
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("SetupKeys");
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
)(AdditionalMobileKeysStepFour);
