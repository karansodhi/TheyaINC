//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import ApiConfig from "../../config";
import { registerPrimaryPublicKey } from "../../redux/actions/index";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import { setupMobileKey } from "../../utils/BtcFunc";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import CustomLoader from "../../components/loader/CustomLoader";
import { getSession } from "../../utils/Session";
import {
  PRIMARY_XPUB,
  PRIMARY_XPUB_MAINNET,
  RECOVERY_XPUB,
  RECOVERY_XPUB_MAINNET,
  SECONDARY_XPUB,
  SECONDARY_XPUB_MAINNET,
  SESSION_USER_DETAIL,
} from "../../utils/StringUtility";
import { getValueFromKeyChain } from "../../utils/BtcFunc";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { map } from "lodash";
import SetupCard from "./StepCard";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
//#endregion "npm Dependencies "
//#region "End"

const setupArray = [
  {
    title: "1. Setup mobile key",
    desc: "Using this device",
    completedText: "1. Mobile key created",
    image: ImagePaths.DEVICE_MOBILE_SPEAKER_WHITE,
  },
  {
    title: "2. Additional mobile key",
    desc: "Using another device",
    completedText: "2. Additional key created",
    image: ImagePaths.DEVICE_MOBILE,
  },
  {
    title: "3. Setup a recovery key",
    desc: "By adding question answers",
    completedText: "",
    image: ImagePaths.CLOUD_ARROW_UP_WHITE,
  },
];

const SetupKeys = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const [keychainValue, setKeychainValue] = useState(null);
  const [activeSetup, setActiveSetup] = useState(1);

  const [firstXpub, setFirstXpub] = useState(null);
  const [secondXpub, setSecondXpub] = useState(null);
  const [thirdXpub, setThirdXpub] = useState(null);

  const [firstXpubMainnet, setFirstXpubMainnet] = useState(null);
  const [secondXpubMainnet, setSecondXpubMainnet] = useState(null);
  const [thirdXpubMainnet, setThirdXpubMainnet] = useState(null);

  useEffect(() => {
    dispatch({ type: HIDE_LOADER });
    getPublicPrivatKeys();
  }, []);

  const getPublicPrivatKeys = async () => {
    let credentials = await getValueFromKeyChain();
    if (credentials) {
      // setKeychainValue(credentials);
      // console.log("credentials===>", credentials); //username == private key, password == all three keys
      console.log("ALL KEY===>", JSON.parse(credentials?.password)); //password == all keys 1. mnemonic 2. privateKey 3. publickey
    }
  };

  const handleKey = async () => {
    if (keychainValue == null) {
      dispatch({ type: SHOW_LOADER });
      setTimeout(async () => {
        const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));

        let publicKey = await setupMobileKey(true);
        let mainnetPublicKey = await setupMobileKey(false);
        // props.registerPrimaryPublicKey({
        //   sessionToken: userDetails.sessionToken,
        //   publicKey: publicKey,
        // });

        const registerPrimaryPublicResponse = await fetch(
          "https://dev.theya.us/v1/device/register_primary_xpub",
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_token: userDetails.sessionToken,
              primary_testnet_xpub: publicKey,
              primary_mainnet_xpub: mainnetPublicKey,
            }),
          }
        );
        const registerPrimaryPublicResult =
          await registerPrimaryPublicResponse.json();
        console.log(
          "registerPrimaryPublicResult----",
          registerPrimaryPublicResult
        );

        dispatch({ type: HIDE_LOADER });
        //Import Alert first
        // if (registerPrimaryPublicResult?.key_registered) {
        //   Alert.alert("Primary key already register for this user.");
        // } else {
        //   Alert.alert(registerPrimaryPublicResult?.error);
        // }

        if (registerPrimaryPublicResult?.error) {
          Toast.show({
            type: "error",
            text1: registerPrimaryPublicResult?.error,
          });
        } else {
          navigation.navigate("SetupMobileKeysStepOne");
        }
      }, 1000);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // console.log("Index.js is mount");
      getAllXpub();
      return () => {
        // console.log("Index.js is unmount");
      };
    }, [])
  );

  const getAllXpub = async () => {
    console.log("getAllXpub ===> ");
    const f_xpub = JSON.parse(await getSession(PRIMARY_XPUB));
    const s_xpub = JSON.parse(await getSession(SECONDARY_XPUB));
    const r_xpub = JSON.parse(await getSession(RECOVERY_XPUB));
    console.log("getAllXpub f_xpub ===> ", f_xpub);
    console.log("getAllXpub s_xpub ===> ", s_xpub);
    console.log("getAllXpub r_xpub ===> ", r_xpub);
    setFirstXpub(f_xpub);
    setSecondXpub(s_xpub);
    setThirdXpub(r_xpub);

    const f_xpub_mainnet = JSON.parse(await getSession(PRIMARY_XPUB_MAINNET));
    const s_xpub_mainnet = JSON.parse(await getSession(SECONDARY_XPUB_MAINNET));
    const r_xpub_mainnet = JSON.parse(await getSession(RECOVERY_XPUB_MAINNET));

    setFirstXpubMainnet(f_xpub_mainnet);
    setSecondXpubMainnet(s_xpub_mainnet);
    setThirdXpubMainnet(r_xpub_mainnet);

    if (
      f_xpub == null &&
      s_xpub == null &&
      r_xpub == null &&
      f_xpub_mainnet == null &&
      s_xpub_mainnet == null &&
      r_xpub_mainnet == null
    ) {
      setActiveSetup(1);
    } else if (
      s_xpub == null &&
      r_xpub == null &&
      s_xpub_mainnet == null &&
      r_xpub_mainnet == null
    ) {
      setActiveSetup(2);
    } else {
      setActiveSetup(3);
    }
  };

  return (
    <>
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
          <View style={styles.titleContainer}>
            <Image
              source={ImagePaths.FINGER_PRINT}
              style={styles.questionIcon}
            />
            <Text style={styles.title}>Setup your keys</Text>
            <Text style={styles.titleDesc}>
              {` You should finish setting up\nthis three keys to start using\nyour wallet`}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progress,
                {
                  width: widthPercentageToDP(
                    activeSetup == 1 ? 10 : activeSetup == 2 ? 20 : 30
                  ),
                },
              ]}
            />
          </View>
          <View>
            {map(setupArray, (setup, key) => {
              const currentKey = key + 1;
              return (
                <SetupCard
                  key={key}
                  title={setup.title}
                  desc={setup.desc}
                  isActive={activeSetup == currentKey}
                  isCompleted={currentKey < activeSetup}
                  completedText={setup.completedText}
                  image={setup.image}
                  callback={() => {
                    if (activeSetup < 3) {
                      setActiveSetup(activeSetup + 1);
                    }
                    if (activeSetup == 1) {
                      handleKey();
                    } else if (activeSetup == 2) {
                      if (
                        firstXpub != null &&
                        secondXpub == null &&
                        firstXpubMainnet != null &&
                        secondXpubMainnet == null
                      ) {
                        navigation.navigate("AdditionalMobileKeysStepOne");
                      }
                    } else if (activeSetup == 3) {
                      if (
                        firstXpub != null &&
                        secondXpub != null &&
                        thirdXpub == null &&
                        firstXpubMainnet != null &&
                        secondXpubMainnet != null &&
                        thirdXpubMainnet == null
                      ) {
                        navigation.navigate("RecoveryQuestionOne");
                      }
                    }
                  }}
                />
              );
            })}
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.note}>
              You’ll be auto navigated to wallet{"\n"}page once its fully done
            </Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  registerPrimaryPublicKey,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetupKeys);
