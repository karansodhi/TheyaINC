//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import { getSession, removeSession, storeSession } from "../../utils/Session";
import {
  PRIMARY_XPUB,
  PRIMARY_XPUB_MAINNET,
  RECOVERY_XPUB,
  RECOVERY_XPUB_MAINNET,
  SECONDARY_XPUB,
  SECONDARY_XPUB_MAINNET,
} from "../../utils/StringUtility";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  cleanMultiSigWallet,
  createBDKMultiSigWallet,
} from "../../utils/BtcFunc";
//#endregion "npm Dependencies "
//#region "End"

const KeySetupComplete = ({ route, navigation, ...props }) => {
  const dispatch = useDispatch();
  const data = route.params?.fromSetting;
  const networkList = [
    {
      title: "Testnet",
    },
    {
      title: "Mainnet",
    },
  ];
  const [title, setTitle] = useState("Testnet");

  useEffect(() => {
    dispatch({ type: HIDE_LOADER });
  });

  const CreateWallet = async () => {
    const f_xpub = JSON.parse(await getSession(PRIMARY_XPUB));
    const s_xpub = JSON.parse(await getSession(SECONDARY_XPUB));
    const r_xpub = JSON.parse(await getSession(RECOVERY_XPUB));
    const f_xpub_mainnet = JSON.parse(await getSession(PRIMARY_XPUB_MAINNET));
    const s_xpub_mainnet = JSON.parse(await getSession(SECONDARY_XPUB_MAINNET));
    const r_xpub_mainnet = JSON.parse(await getSession(RECOVERY_XPUB_MAINNET));
    console.log("f_xpub ===> ", f_xpub);
    console.log("s_xpub ===> ", s_xpub);
    console.log("r_xpub ===> ", r_xpub);

    if (
      f_xpub != null &&
      s_xpub != null &&
      r_xpub != null &&
      f_xpub_mainnet != null &&
      s_xpub_mainnet != null &&
      r_xpub_mainnet != null
    ) {
      console.log("Explore my wallet");
      dispatch({ type: SHOW_LOADER });
      setTimeout(async () => {
        let saveWalletAddress = await cleanMultiSigWallet(
          true,
          f_xpub,
          s_xpub,
          r_xpub
        );
        let saveWalletAddressMainnet = await cleanMultiSigWallet(
          false,
          f_xpub_mainnet,
          s_xpub_mainnet,
          r_xpub_mainnet
        );
        dispatch({ type: HIDE_LOADER });
        if (saveWalletAddress && saveWalletAddressMainnet) {
          navigation.navigate("MyTab");
        }
      }, 1000);
    } else {
      Toast.show({
        type: "error",
        text1: "Please generate all three keys first.",
      });
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <View style={styles.subContainer}>
        <LinearGradient
          start={{ x: 1.5, y: -2 }}
          end={{ x: 1.6, y: 1.1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={styles.roundContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hi,</Text>
            <Image source={ImagePaths.HEADSET} style={styles.headset} />
          </View>
          <Image source={ImagePaths.BTC_ROUND} style={styles.logo} />
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>
              Secured with{" "}
              <Text style={{ color: colorsCode.COLOR_PARROT }}>multisig </Text>
            </Text>
            <Image source={ImagePaths.LOCK_GREEN} style={styles.lock} />
          </View>
          <Text
            style={[
              styles.title,
              { marginTop: 5, fontSize: widthPercentageToDP("10%") },
            ]}
          >
            0.00 BTC
          </Text>

          <View style={styles.bottomRoundContainer}>
            {data ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.networkTitle}>Select network</Text>
                <Text style={styles.titleDesc}>
                  You can change it anytime from {"\n"} the settings tab as well
                </Text>
                <Text style={styles.secureText}>Select the network</Text>
                <View style={styles.radioContainer}>
                  {networkList?.map((data, key) => {
                    return (
                      <View style={styles.radioItemContainer} key={key}>
                        <TouchableOpacity
                          style={styles.roundBtn}
                          onPress={() => setTitle(data.title)}
                        >
                          {title == data.title && (
                            <View style={styles.roundBtnBg} />
                          )}
                        </TouchableOpacity>
                        <Text style={styles.titleBtn}>{data.title}</Text>
                      </View>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={[
                    styles.continueContainer,
                    { backgroundColor: colorsCode.COLOR_BLACK },
                  ]}
                  onPress={() => {
                    navigation.navigate("MyTab");
                  }}
                >
                  <Text
                    style={[
                      styles.continueContainerTitle,
                      { color: colorsCode.COLOR_GOLD },
                    ]}
                  >
                    Save and continue
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Image
                  source={ImagePaths.GREEN_CHECKMARK}
                  style={styles.checkMark}
                />
                <Text
                  style={[
                    styles.title,
                    { color: colorsCode.COLOR_BLACK, marginTop: 10 },
                  ]}
                >
                  Congratulations
                </Text>
                <Text style={styles.titleDesc}>
                  All set to start using your wallet{"\n"} and enjoy fully
                  secured
                  {"\n"}
                  transactions
                </Text>

                <TouchableOpacity
                  style={styles.continueContainer}
                  onPress={() => {
                    CreateWallet();
                  }}
                >
                  <Text style={styles.continueContainerTitle}>
                    Explore my wallet
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(KeySetupComplete);
