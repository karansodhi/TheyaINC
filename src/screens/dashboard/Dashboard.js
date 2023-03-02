//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
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

const Dashboard = ({ navigation, ...props }) => {
  return (
    <LinearGradient
      colors={[
        colorsCode.COLOR_LINEAR_GRADIENT_ONE,
        colorsCode.COLOR_LINEAR_GRADIENT_TWO,
      ]}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} />
      <View style={styles.subContainer}>
        <Image source={ImagePaths.QUESTION} style={styles.questionIcon} />
        <Text style={styles.title}>Dashbard in progress...</Text>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
