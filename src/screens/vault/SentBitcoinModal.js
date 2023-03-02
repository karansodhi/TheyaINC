import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native";
import SwipeButton from "./SwipeButton";
import { getValueFromKeyChain, sendTxn } from "../../utils/BtcFunc";
import { getSession } from "../../utils/Session";
import {
  GET_BALANCE,
  PRIMARY_XPUB,
  PRIMARY_XPUB_MAINNET,
  RECOVERY_XPUB,
  RECOVERY_XPUB_MAINNET,
  SECONDARY_XPUB,
  SECONDARY_XPUB_MAINNET,
  SESSION_USER_DETAIL,
} from "../../utils/StringUtility";
import axios from "axios";
import ApiConfig from "../../config";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const SentBitcoinModal = ({
  visible,
  closeCallback,
  currentStep,
  callback,
  sentFormData,
  backCallback,
  hideBack,
  isAccept,
  walletBalance,
  activeNetwork,
}) => {
  const dispatch = useDispatch();
  const [networkFee, setNetworkFee] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  useEffect(() => {
    getNetworkFee();
  }, []);

  const getNetworkFee = async () => {
    const fee = await getEstimatedFee();
    setNetworkFee(fee);
  };

  const sendTransaction = async (amount) => {
    closeCallback();
    dispatch({ type: SHOW_LOADER });
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    try {
      // const fee = await getEstimatedFee();
      const utxos = await getUtxos(amount, networkFee);

      // console.log("sendTransaction amount", amount);
      // console.log("sendTransaction standard fee", networkFee);
      console.log("sendTransaction utxos", utxos);
      var finalAmount = Number(networkFee) + Number(amount);
      // console.log("sendTransaction finalAmount", Number(finalAmount));

      let myBalance = JSON.parse(await getSession(GET_BALANCE));
      if (myBalance) {
        let finalBalance = myBalance?.balance?.confirmedBalance?.amount;
        // console.log("sendTransaction finalBalance", finalBalance);

        // Make validation between amount and waller balance
        if (Number(networkFee) <= Number(finalBalance)) {
          //Make payment send transaction
          let primaryPrivatKey = "";
          let mainnetPrivateKey = "";
          let credentials = await getValueFromKeyChain();
          if (credentials) {
            // console.log("credentials===>", credentials); //username == private key, password == all three keys
            console.log("ALL KEY===>", JSON.parse(credentials?.password)); //password == all keys 1. mnemonic 2. privateKey 3. publickey
            primaryPrivatKey = JSON.parse(credentials?.password).privateKey;
            mainnetPrivateKey = JSON.parse(
              credentials?.password
            ).mainnetPrivateKey;
          }
          // todo mainnet key
          const f_xpub =
            activeNetwork === "mainnet"
              ? JSON.parse(await getSession(PRIMARY_XPUB_MAINNET))
              : JSON.parse(await getSession(PRIMARY_XPUB));
          const s_xpub =
            activeNetwork === "mainnet"
              ? JSON.parse(await getSession(SECONDARY_XPUB_MAINNET))
              : JSON.parse(await getSession(SECONDARY_XPUB));
          const r_xpub =
            activeNetwork === "mainnet"
              ? JSON.parse(await getSession(RECOVERY_XPUB_MAINNET))
              : JSON.parse(await getSession(RECOVERY_XPUB));

          let partialySignedTx = await sendTxn(
            finalAmount,
            f_xpub,
            s_xpub,
            r_xpub,
            recipientAddress,
            activeNetwork === "mainnet" ? mainnetPrivateKey : primaryPrivatKey, //primaryPrivatKey
            utxos?.utxos,
            activeNetwork === "mainnet" ? false : true //isTestnet
          );
          console.log(
            "partialySignedTx in SentBitcoinModal =======>",
            partialySignedTx
          );
          const data = {
            signed_transaction: partialySignedTx.partialySignedTx,
            amount: amount,
            fee: networkFee,
          };

          try {
            const response = await axios.post(
              `${ApiConfig.INITIATE_TRANSACTION}?user_id=${userDetails.userID}&session_token=${userDetails.sessionToken}`,
              data,
              {
                headers: {
                  network: activeNetwork,
                },
              }
            );
            dispatch({ type: HIDE_LOADER });
            setTimeout(() => {
              Toast.show({
                type: "success",
                text1: "Transaction Initiate Successful",
              });
            }, 600);
          } catch (e) {
            dispatch({ type: HIDE_LOADER });

            setTimeout(() => {
              Toast.show({
                type: "error",
                text1: e?.response?.data?.error
                  ? e.response.data.error
                  : "Something went wrong",
              });
            }, 500);
          }
        } else {
          dispatch({ type: HIDE_LOADER });

          setTimeout(() => {
            Toast.show({
              type: "error",
              text1: "Low Balance",
            });
          }, 500);
        }
      }
    } catch (error) {
      dispatch({ type: HIDE_LOADER });
      setTimeout(() => {
        Toast.show({
          type: "error",
          text1: error?.response?.data?.error
            ? error.response.data.error
            : "Something went wrong",
        });
      }, 1000);

      console.log(error);
    }
  };

  const getEstimatedFee = async (type = "standard") => {
    // possible types:  standard|fast|slow
    try {
      const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
      if (userDetails) {
        const sessionToken = userDetails?.sessionToken; //replace
        const userId = userDetails?.userID; // replace
        // const sessionToken = "OebCxTFgW-xicC4AR-uk3iu_6ocLLmXahJ5iAbCFLKck"; //replace
        // const userId = "user-test-a1cfe275-8ae5-4d03-a080-9f1f0241b81d"; // replace

        console.log(
          "***********estimated fee data*********** activeNetwork",
          activeNetwork
        );

        const result = await fetch(
          `https://dev.theya.us/v1/wallet/recommended_fees?session_token=${sessionToken}&user_id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              network: activeNetwork,
            },
          }
        );
        const data = await result.json();
        console.log("***********estimated fee data***********", data);
        // using standard fee for now.
        return data.fees[type];
      }
    } catch (err) {
      console.log("getEstimatedFee", { err });
      throw err;
    }
  };

  const getUtxos = async (amount, estimatedFee) => {
    try {
      const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));

      if (userDetails) {
        console.log("getUtxos sessionToken", userDetails?.sessionToken);
        console.log("getUtxos userID", userDetails?.userID);

        const sessionToken = userDetails?.sessionToken; //replace
        const userId = userDetails?.userID; // replace

        const totalTransactionAmount = Number(amount) + Number(estimatedFee);
        console.log({ totalTransactionAmount });

        const result = await fetch(
          `https://dev.theya.us/v1/wallet/compute_utxos?session_token=${sessionToken}&user_id=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              network: activeNetwork,
            },
            body: JSON.stringify({
              transaction_amount: totalTransactionAmount,
            }),
          }
        );
        const data = await result.json();
        // console.log("*********getUtxos**********", data);
        return data;
      } else {
        return [];
      }
    } catch (err) {
      console.log("getUtxos", { err });
      throw err;
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeCallback}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "position"}
      >
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
          <View style={styles.modalContainer}>
            {currentStep != 1 && !hideBack ? (
              <View style={styles.backBtn}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={backCallback}
                  style={styles.commonPadding}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../../assets/icons/back.png")}
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
            <View style={styles.sentBtnSmall}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/up.png")}
                style={styles.iconSmall}
              />
            </View>
            <Text style={styles.modalTitle}>
              {isAccept ? `Sending BTC to` : `Send bitcoin`}
            </Text>
            {!isAccept ? (
              <Text style={styles.currentBalance}>
                {`(Current balance: ${walletBalance?.balance?.confirmedBalance?.amount} BTC)`}
              </Text>
            ) : (
              <View />
            )}
            {currentStep === 3 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.name}>Sender Name</Text>
                <Text style={styles.addressText2}>
                  {isAccept ? sentFormData.wallet_address : recipientAddress}
                </Text>
                <Text style={styles.btc}>BTC</Text>
                <Text style={styles.btcAmount}>
                  {isAccept ? sentFormData.amount : amount}
                </Text>
                <Text style={styles.btcSub}>~$2568</Text>
                <Text style={styles.btnNetwork}>
                  (Network fee: {networkFee} BTC)
                </Text>
                <View style={{ paddingTop: 26 }}>
                  <SwipeButton
                    onToggle={async () => {
                      if (isAccept) {
                        callback();
                      } else {
                        sendTransaction(amount);
                      }
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={closeCallback}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelBtnText}>
                    {isAccept ? `Reject` : `Cancel`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.textInputTitle}>
                  {currentStep == 1 ? `Amount you’re sending` : `Recipient`}
                </Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        width: currentStep === 1 ? wp(60) : null,
                      },
                    ]}
                    // value={
                    //   currentStep === 1
                    //     ? sentFormData.bitcoinAmount
                    //     : sentFormData.address
                    // }
                    value={currentStep === 1 ? amount : recipientAddress}
                    placeholder={
                      currentStep === 1
                        ? "Enter bitcoin amount"
                        : "Enter recipient wallet address"
                    }
                    onChangeText={(text) => {
                      currentStep === 1
                        ? setAmount(text)
                        : setRecipientAddress(text);
                    }}
                    placeholderTextColor={colorsCode.COLOR_PLACEHOLDER}
                    keyboardType={currentStep === 1 ? "decimal-pad" : "default"}
                  />
                  {currentStep === 1 ? (
                    <View>
                      <Text style={styles.textInputRight}>$00.00</Text>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                {currentStep === 1 ? (
                  <View style={styles.textInputBottom}>
                    <Text style={styles.textInputBottomLeft}>Network fee</Text>
                    <Text style={styles.textInputBottomRight}>
                      {networkFee} BTC
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {currentStep === 2 ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={callback}
                    style={styles.qrBtn}
                  >
                    <Text style={styles.qrBtnText}>
                      {`Scan QR code instead`}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={callback}
                  style={styles.sentBtn}
                >
                  <Text style={styles.sentBtnText}>
                    {currentStep === 1 ? `Choose recipient` : `Send bitcoin`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SentBitcoinModal;
