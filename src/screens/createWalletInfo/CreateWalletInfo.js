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

const CreateWalletInfo = ({ navigation, ...props }) => {
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
        <Image
          source={ImagePaths.ORANGE_QUESTION}
          style={styles.questionIcon}
        />
        <Text style={styles.title}>How it’s working?</Text>
        <Text style={styles.titleDesc}>
          {`We need to secure your wallet in\nthree ways. And nobody can\ntweak it without your\nknowledge. All these details will\nbe securely stored in different\nservers for added security.`}
        </Text>
        <Text style={[styles.stepTitle]}>3 simple steps.</Text>
        <View>
          <View style={styles.mainView}>
            <Image
              source={ImagePaths.DEVICE_MOBILE_CAMERA}
              style={styles.stepIcon}
            />
            <View style={styles.subView}>
              <Text style={styles.viewTitle}>Setting up a mobile key</Text>
              <Text style={styles.viewTitleDesc}>You can use this iPhone</Text>
            </View>
          </View>

          <View style={styles.mainView}>
            <Image
              source={ImagePaths.DEVICE_MOBILE_SPEAKER}
              style={styles.stepIcon}
            />
            <View style={styles.subView}>
              <Text style={styles.viewTitle}>Mobile key on another device</Text>
              <Text style={styles.viewTitleDesc}>By using another device</Text>
            </View>
          </View>

          <View style={styles.mainView}>
            <Image
              source={ImagePaths.CLOUD_ARROW_DOWN}
              style={styles.stepIcon}
            />
            <View style={styles.subView}>
              <Text style={styles.viewTitle}>Adding a recovery key</Text>
              <Text style={styles.viewTitleDesc}>
                Will be saved in Theya servers
              </Text>
            </View>
          </View>
        </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletInfo);
