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
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { RECOVERY_XPUB, SESSION_USER_DETAIL } from "../../utils/StringUtility";
import { getSession, removeSession, storeSession } from "../../utils/Session";
import { connect, useDispatch } from "react-redux";
import {
  SHOW_LOADER,
  HIDE_LOADER,
  EDIT_QUESTION_ANSWER,
  CLEAR_EDIT_QUESTION_ANSWER,
} from "../../redux/actions/ActionTypes";
//#endregion "npm Dependencies "
//#region "End"

const ConfirmQuestion = ({ navigation, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_EDIT_QUESTION_ANSWER });
    console.log("saveFQA", props.saveFQA);
    console.log("saveSQA", props.saveSQA);
    console.log("saveTQA", props.saveTQA);
  }, []);

  const generateRecoveryKey = async () => {
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    if (userDetails) {
      dispatch({ type: SHOW_LOADER });
      console.log(
        "generateRecoveryKey sessionToken==>",
        userDetails.sessionToken
      );
      const URL =
        "https://dev.theya.us/v1/generate_recovery_key?session_token=" +
        userDetails.sessionToken +
        "&user_id=" +
        userDetails.userID;
      console.log("generateRecoveryKey URL==>", URL);

      var allQA = [];
      allQA.push(props.saveFQA);
      allQA.push(props.saveSQA);
      allQA.push(props.saveTQA);

      console.log(
        "generateRecoveryKey passDict==>",
        JSON.stringify({
          questionaire: allQA,
        })
      );

      //FOR TESTNET
      const generateRecoveryKeyResponse = await fetch(URL, {
        // credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          network: "testnet",
        },
        body: JSON.stringify({
          questionaire: allQA,
        }),
      });
      const generateRecoveryKeyResult =
        await generateRecoveryKeyResponse.json();
      console.log("generateRecoveryKeyResult----", generateRecoveryKeyResult);

      //FOR MAINNET
      const generateMainnetRecoveryKeyResponse = await fetch(URL, {
        // credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          network: "mainnet",
        },
        body: JSON.stringify({
          questionaire: allQA,
        }),
      });
      const generateMainnetRecoveryKeyResult =
        await generateMainnetRecoveryKeyResponse.json();
      console.log(
        "generateMainnetRecoveryKeyResult----",
        generateMainnetRecoveryKeyResult
      );

      if (
        (generateRecoveryKeyResult?.is_verified &&
          generateMainnetRecoveryKeyResult?.is_verified) ||
        (generateRecoveryKeyResult?.is_exists &&
          generateMainnetRecoveryKeyResult?.is_exists)
      ) {
        storeSession(
          RECOVERY_XPUB,
          JSON.stringify(generateRecoveryKeyResult?.recovery_xpub)
        );
        storeSession(
          RECOVERY_XPUB_MAINNET,
          JSON.stringify(generateMainnetRecoveryKeyResult?.recovery_xpub)
        );
        navigation.navigate("HighlyRecoveryKey");

        dispatch({ type: HIDE_LOADER });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong while generating recovery key!",
        });
      }

      dispatch({ type: HIDE_LOADER });
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
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
        <Text style={styles.title}>Confirm your{"\n"}questions</Text>
        <Text style={styles.titleDesc}>
          You can not make changes to{"\n"}these questions later. So, double
          {"\n"}
          check the question and answers{"\n"}before creating the recovery key.
        </Text>

        <View>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 2, y: -1 }}
              colors={colorsCode.colors.GRADIENT2}
              style={styles.mainView}
            >
              <View style={styles.subView}>
                <Text style={styles.viewTitle}>{props.saveFQA?.question}</Text>
                <Text style={styles.viewTitleDesc}>
                  {props.saveFQA?.answer}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.yellowIconContainer}
                onPress={() => {
                  // navigation.state.params.goBackData("test");
                  dispatch({ type: EDIT_QUESTION_ANSWER });
                  navigation.navigate("RecoveryQuestionOne");
                }}
              >
                <Image
                  source={ImagePaths.PENCIL}
                  style={styles.yellowRightIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 2, y: -1 }}
              colors={colorsCode.colors.GRADIENT2}
              style={styles.mainView}
            >
              <View style={styles.subView}>
                <Text style={styles.viewTitle}>{props.saveSQA?.question}</Text>
                <Text style={styles.viewTitleDesc}>
                  {props.saveSQA?.answer}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.yellowIconContainer}
                onPress={() => {
                  dispatch({ type: EDIT_QUESTION_ANSWER });
                  navigation.navigate("RecoveryQuestionTwo");
                }}
              >
                <Image
                  source={ImagePaths.PENCIL}
                  style={styles.yellowRightIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 2, y: -1 }}
              colors={colorsCode.colors.GRADIENT2}
              style={styles.mainView}
            >
              <View style={styles.subView}>
                <Text style={styles.viewTitle}>{props.saveTQA?.question}</Text>
                <Text style={styles.viewTitleDesc}>
                  {" "}
                  {props.saveTQA?.answer}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.yellowIconContainer}
                onPress={() => {
                  navigation.navigate("RecoveryQuestionThree");
                }}
              >
                <Image
                  source={ImagePaths.PENCIL}
                  style={styles.yellowRightIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            generateRecoveryKey();
            // navigation.navigate("HighlyRecoveryKey");
          }}
        >
          <Text style={styles.continueContainerTitle}>Confirm and proceed</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  saveQA: state.setupkeys.saveQA,
  saveFQA: state.setupkeys.saveFQA,
  saveSQA: state.setupkeys.saveSQA,
  saveTQA: state.setupkeys.saveTQA,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmQuestion);
