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
import { getSession } from "../../utils/Session";
import {
  PRIMARY_XPUB,
  RECOVERY_XPUB,
  SECONDARY_XPUB,
} from "../../utils/StringUtility";
//#endregion "npm Dependencies "
//#region "End"
const HighlyRecoveryKey = ({ navigation, ...props }) => {
  // useEffect(() => {
  //   getAllXpub();
  // });

  // const getAllXpub = async () => {
  //   const f_xpub = JSON.parse(await getSession(PRIMARY_XPUB));
  //   const s_xpub = JSON.parse(await getSession(SECONDARY_XPUB));
  //   const r_xpub = JSON.parse(await getSession(RECOVERY_XPUB));
  //   console.log("f_xpub ===> ", f_xpub);
  //   console.log("s_xpub ===> ", s_xpub);
  //   console.log("r_xpub ===> ", r_xpub);
  // };

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
        <Image source={ImagePaths.BIG_SHIELD} style={styles.shieldIcon} />
        <Text style={styles.title}>
          Creating a highly{"\n"}secured recovery key
        </Text>
        <Text style={styles.titleDesc}>
          We’re creating the recovery key{"\n"}as the third authorization of
          your{"\n"}multisig wallet. This will be stored{"\n"}securely in our
          servers
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            navigation.navigate("KeySetupComplete");
          }}
        >
          <Text style={styles.continueContainerTitle}>Done</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HighlyRecoveryKey);
