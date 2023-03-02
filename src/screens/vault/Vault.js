//#region "Start"
//#region "React Native Dependencies "
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP } from "react-native-responsive-screen";
import VaultHeader from "./VaultHeader";
import VaultBody from "./VaultBody";
import ReceiveBitcoinModal from "./ReceiveBitcoinModal";
import SentBitcoinModal from "./SentBitcoinModal";
import { getSession, removeSession, storeSession } from "../../utils/Session";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import {
  GET_BALANCE,
  IS_SECONDARY_DEVICE,
  SESSION_USER_DETAIL,
  SESSION_USER_WALLET,
  SESSION_USER_WALLET_MAINNET,
  SESSION_NETWORK,
} from "../../utils/StringUtility";
import { sendTxn } from "../../utils/BtcFunc";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../utils/ToastStyle";
import Clipboard from "@react-native-clipboard/clipboard";
import NetworkModal from "./NetworkModal";
//#endregion "npm Dependencies "
//#region "End"

const Vault = ({ route, navigation, ...props }) => {
  const dispatch = useDispatch();
  const [isWalletActive, setIsWalletActive] = useState(false);
  const [walletBalance, setWalletBalance] = useState({});
  const [modalType, setModalType] = useState("");
  const [sentStep, setSentStep] = useState(1);
  const [sentFormData, setSentFormData] = useState({
    amount: "",
    bitcoinAmount: "",
    address: "",
    name: "",
    networkFee: "",
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [secondaryDevice, setSecondaryDevice] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [userData, setUserData] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    initalCall();
  }, []);

  const initalCall = async () => {
    const isSecondaryDevice = await getSession(IS_SECONDARY_DEVICE);
    const isNetwork = await getSession(SESSION_NETWORK);
    setActiveNetwork(isNetwork === "mainnet" ? "mainnet" : "testnet");
    if (isSecondaryDevice === "true") {
      setSecondaryDevice(true);
    } else {
      dispatch({ type: HIDE_LOADER });
      getWalletAddressBalance();
    }
  };

  const getWalletAddressBalance = async () => {
    try {
      let wAddress = JSON.parse(await getSession(SESSION_USER_WALLET));
      let wAddressMainnet = JSON.parse(
        await getSession(SESSION_USER_WALLET_MAINNET)
      );
      console.log("getWalletAddressBalance ADDRESS ======>", wAddress.address);
      setWalletAddress(wAddress.address);
      if (
        wAddress &&
        wAddress.address &&
        wAddressMainnet &&
        wAddressMainnet.address
      ) {
        setIsWalletActive(true);
      }
      const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
      console.log(userDetails);
      setUserData(userDetails);
      if (userDetails) {
        dispatch({ type: SHOW_LOADER });

        const URLForRegisterWallet =
          "https://dev.theya.us/v1/wallet/store_address?session_token=" +
          userDetails.sessionToken +
          "&user_id=" +
          userDetails.userID;
        console.log("registerWallet URL==>", URLForRegisterWallet);

        //FOR TESTNET
        const registerWalletResponse = await fetch(URLForRegisterWallet, {
          // credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            network: "testnet", //activeNetwork,
          },
          body: JSON.stringify({
            wallet_address: wAddress.address,
          }),
        });
        const registerWalletResult = await registerWalletResponse.json();
        console.log("registerWalletResult----", registerWalletResult);

        //FOR MAINNET
        const registerMainWalletResponse = await fetch(URLForRegisterWallet, {
          // credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            network: "mainnet", //activeNetwork,
          },
          body: JSON.stringify({
            wallet_address: wAddressMainnet.address,
          }),
        });
        const registerWalletMainnetResult =
          await registerMainWalletResponse.json();
        console.log(
          "registerWalletMainnetResult----",
          registerWalletMainnetResult
        );

        const URL =
          "https://dev.theya.us/v1/wallet/balance?session_token=" +
          userDetails.sessionToken +
          "&user_id=" +
          userDetails.userID;
        console.log("getWalletAddressBalance URL==>", URL);
        const getWalletAddressBalanceResponse = await fetch(URL, {
          method: "GET",
          network: activeNetwork,
          // credentials: "include",
        });
        const getWalletAddressBalanceResult =
          await getWalletAddressBalanceResponse.json();
        console.log(
          "getWalletAddressBalanceResult----",
          JSON.stringify(getWalletAddressBalanceResult)
        );

        storeSession(
          GET_BALANCE,
          JSON.stringify(getWalletAddressBalanceResult)
        );
        setWalletBalance(getWalletAddressBalanceResult);
        dispatch({ type: HIDE_LOADER });
      }
    } catch (error) {
      dispatch({ type: HIDE_LOADER });
      console.log("getWalletAddressBalance error ==> ", error);
    }
  };

  const handleCopy = (value) => {
    setModalType("");
    Clipboard.setString(value);
    setTimeout(() => {
      Toast.show({
        type: "copyToast",
        text1: "Copied successfully",
      });
    }, 400);
  };

  const handleNetwork = () => {
    setShowNetworkModal(false);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <View style={styles.subContainer}>
        <VaultHeader
          secondaryDevice={secondaryDevice}
          walletBalance={walletBalance}
          userData={userData}
          isWalletActive={isWalletActive}
          supportCallback={() => navigation.openDrawer()}
          activeNetwork={activeNetwork}
          networkCallback={() => {
            setShowNetworkModal(true);
          }}
        />
        <VaultBody
          isActive={isWalletActive}
          secondaryDevice={secondaryDevice}
          callback={(callbackType) => {
            if (callbackType === "create") {
            } else {
              setModalType(callbackType);
            }
          }}
        />

        <ReceiveBitcoinModal
          visible={modalType === "receive"}
          address={walletAddress}
          // address={`tb1qh8qyq32ha852e0lck7fx3ptg309y039plee50afrgam9fzv56ngqug57ns`}
          closeCallback={() => {
            setModalType("");
          }}
          copyCallback={handleCopy}
        />
        <SentBitcoinModal
          visible={modalType === "sent"}
          currentStep={sentStep}
          sentFormData={sentFormData}
          walletBalance={walletBalance}
          activeNetwork={activeNetwork}
          callback={() => {
            if (sentStep == 3) {
            } else {
              setSentStep(sentStep + 1);
            }
          }}
          closeCallback={() => {
            setModalType("");
            setSentStep(1);
          }}
          backCallback={() => {
            setSentStep(sentStep - 1);
          }}
        />
      </View>
      <NetworkModal
        visible={showNetworkModal}
        closeCallback={() => {
          setShowNetworkModal(false);
        }}
        activeNetwork={activeNetwork}
        saveCallback={handleNetwork}
        callback={setActiveNetwork}
      />

      <Toast config={toastConfig} />
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Vault);
