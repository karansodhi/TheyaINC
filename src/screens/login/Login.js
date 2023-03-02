//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StatusBar, ScrollView } from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import Button from "../../../button/button";
//#endregion "Project Dependencies "

//#region "Bitcoin Dependencies"
import * as btc from "micro-btc-signer";
import "fast-text-encoding";
import "react-native-get-random-values";
if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;
import * as bip32 from "@scure/bip32";
import * as bip39 from "bip39";
//#endregion "Bitcoin Dependencies "

//#region "Project Dependencies"
//#region "End"

const Login = ({ navigation, ...props }) => {
  const [address, setAddress] = useState("");
  const [displayText, setDisplayText] = useState("");

  const getAddress = async () => {
    ta = new Date() * 1;
    startTime = new Date() * 1;
    const mnemonic = bip39.generateMnemonic(256);
    tb = new Date() * 1;
    console.log("generateMnemonic: ", tb - ta);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    ta = new Date() * 1;
    console.log("mnemonicToSeedSync: ", ta - tb);
    const privKey = bip32.HDKey.fromMasterSeed(seed);
    tb = new Date() * 1;
    console.log("fromMasterSeed: ", tb - ta);
    const addressStr = btc.getAddress("wpkh", privKey.privateKey);
    ta = new Date() * 1;
    console.log("getAddress: ", ta - tb);
    endTime = new Date() * 1;
    console.log(endTime - startTime);
    setAddress(addressStr);
    setDisplayText(addressStr);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Bitcoin Funcs</Text>
        </View>

        <View style={styles.methodSection}>
          <Button
            title="Generate Address"
            style={styles.methodButton}
            onPress={getAddress}
          />
        </View>
        {/* method call result */}
        {displayText && (
          <View style={styles.responseSection}>
            <Text style={styles.responseText} selectable>
              Response:
            </Text>
            <Text selectable>{displayText}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={styles.mainContainer}>
  //     <View style={styles.mainContainer}>
  //       <Text>This is login screen</Text>
  //     </View>
  //   </SafeAreaView>
  // );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
