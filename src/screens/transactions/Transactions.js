//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import HeaderBar from "../../components/headerBar/HeaderBar";
import Styles from "./Styles";
import { data } from "../allTransactions/Constant";
import * as font from "../../utils/FontFamily.js";
import axios from "axios";
import ApiConfig from "../../config";
import { getSession } from "../../utils/Session";
import {
  GET_BALANCE,
  IS_SECONDARY_DEVICE,
  SESSION_USER_DETAIL,
} from "../../utils/StringUtility";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { secondarySigning } from "../../utils/BtcFunc";
import SentBitcoinModal from "../vault/SentBitcoinModal";
import moment from "moment";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import Toast from "react-native-toast-message";
//#endregion "npm Dependencies "
//#region "End"

const Transactions = ({ navigation, ...props }) => {
  const [status, setStatus] = useState("All");
  const [datalist, setDatalist] = useState([]);
  const [secondaryDevice, setSecondaryDevice] = useState(false);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [sentFormData, setSentFormData] = useState({});
  const [networkFee, setNetworkFee] = useState(0);
  const [activeNetwork, setActiveNetwork] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    initalCall();
  }, []);

  const initalCall = async () => {
    const isSecondaryDevice = await getSession(IS_SECONDARY_DEVICE);
    const isNetwork = await getSession(SESSION_NETWORK);
    setActiveNetwork(isNetwork === "mainnet" ? "mainnet" : "testnet");
    if (isSecondaryDevice === "true") {
      setSecondaryDevice(true);
      setStatus("Pending");
      secondaryDeviceApiCall();
      getNetworkFee();
    } else {
      apiCall("All");
    }
  };

  const getNetworkFee = async () => {
    const fee = await getEstimatedFee();
    setNetworkFee(fee);
  };

  const getEstimatedFee = async (type = "standard") => {
    // possible types:  standard|fast|slow
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    try {
      const sessionToken = userDetails.sessionToken; //replace
      const userId = userDetails.userId; // replace

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
    } catch (err) {
      dispatch({ type: HIDE_LOADER });
      console.log("getEstimatedFee error ==>", err);
      throw err;
    }
  };

  const apiCall = async (callType) => {
    dispatch({ type: SHOW_LOADER });
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    console.log(userDetails, "userDetails");
    const params =
      callType === "All"
        ? {
            user_id: userDetails.userID,
            session_token: userDetails.sessionToken,
          }
        : {
            user_id: userDetails.userID,
            session_token: userDetails.sessionToken,
            type: callType === "Received" ? "credit" : "debit",
          };
    const response = await axios.get(
      ApiConfig.GET_TRANSACTION,
      { params },
      {
        headers: {
          network: activeNetwork,
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data.transactions, "response.data.transactions");
      setDatalist(response.data.transactions);
    }
    dispatch({ type: HIDE_LOADER });
  };

  const secondaryDeviceApiCall = async () => {
    dispatch({ type: SHOW_LOADER });
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    const response = await axios.get(ApiConfig.GET_INITIATED_TRANSACTION, {
      headers: {
        network: activeNetwork,
      },
    });
    if (response.status === 200) {
      setDatalist(response.data.transactions);
    }
    dispatch({ type: HIDE_LOADER });
  };

  const setStatusFilter = (status) => {
    if (secondaryDevice && status === "Pending") {
      secondaryDeviceApiCall(status);
    } else {
      apiCall(status);
    }
    setStatus(status);
  };

  const handleAccept = async (currentData) => {
    dispatch({ type: SHOW_LOADER });
    const myBalance = await getSession(GET_BALANCE);
    var finalAmount = Number(networkFee) + Number(currentData.amount);
    let finalBalance = myBalance?.balance?.confirmedBalance?.amount;
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    // todo
    // if (finalAmount >= finalBalance) {
    const rawTxn = await secondarySigning(
      currentData.signed_transaction,
      activeNetwork === "testnet" ? true : false
    );

    try {
      const data = {
        transaction_id: currentData.id,
        verified_transaction: rawTxn,
      };

      const response = await axios.post(ApiConfig.PUBLISH_TRANSACTION, data, {
        headers: {
          network: activeNetwork,
        },
      });
      console.log(response, "response");
      dispatch({ type: HIDE_LOADER });
      secondaryDeviceApiCall();
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Transaction Successful",
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
      }, 600);
      console.log(e, "eee ");
    }
    // }
  };

  const renderItem = ({ item, index }) => {
    const date = item.timestamp ? new Date(item.timestamp) : "";
    console.log(item.timestamp, "item.timestamp");
    return (
      <View
        style={{
          paddingBottom: widthPercentageToDP(8),
          paddingLeft: widthPercentageToDP(7),
          paddingRight: widthPercentageToDP(7),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {status === "Pending" ? (
              <Image
                style={Styles.sentAndReceived}
                source={require("../../../assets/icons/sent.png")}
              />
            ) : item.type === "credit" ? (
              <Image
                style={Styles.sentAndReceived}
                source={require("../../../assets/icons/received.png")}
              />
            ) : (
              <Image
                style={Styles.sentAndReceived}
                source={require("../../../assets/icons/sent.png")}
              />
            )}
            <View style={{ paddingLeft: 8 }}>
              <Text style={Styles.itemStatus}>
                {status === "Pending"
                  ? "Sending"
                  : item.type === "credit"
                  ? "Received"
                  : "Sent"}
              </Text>

              <Text style={Styles.dateAndTime}>
                {moment(item.created_at ? item.created_at : date).format(
                  "MMM, DD, yyyy | hh:mm A"
                )}
              </Text>
            </View>
          </View>
          <Text style={Styles.amount}>{item.amount} BTC</Text>
        </View>
        {status === "Pending" ? (
          <TouchableOpacity
            onPress={() => {
              setSentFormData(item);
              setSendModalVisible(true);
            }}
            style={{
              backgroundColor: colorsCode.colors.PRIMARY,
              width: widthPercentageToDP(40),
              borderRadius: widthPercentageToDP(2),
              height: widthPercentageToDP(11),
              alignSelf: "flex-end",
              marginTop: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.fontFamily.semiBold,
                color: colorsCode.colors.SECONDARY,
                fontSize: 15,
              }}
            >
              View and approve
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };

  const listTabs = secondaryDevice
    ? [
        {
          status: "Pending",
        },
        {
          status: "Completed",
        },
        {
          status: "Rejected",
        },
      ]
    : [
        {
          status: "All",
        },
        {
          status: "Received",
        },
        {
          status: "Sent",
        },
      ];

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <View style={styles.subContainer}>
        {/* Header*/}

        <LinearGradient
          start={{ x: 1.5, y: -2 }}
          end={{ x: 1.6, y: 1.1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={Styles.roundContainer}
        >
          <HeaderBar title="Transactions" />
        </LinearGradient>

        <View style={[Styles.btns]}>
          {listTabs.map((e) => {
            return (
              <TouchableOpacity
                style={[
                  Styles.btn1,
                  {
                    backgroundColor:
                      status === e.status
                        ? colorsCode.COLOR_WHITE
                        : colorsCode.COLOR_GRAY1,
                  },
                ]}
                onPress={() => setStatusFilter(e.status)}
              >
                <Text style={Styles.btnText}>{e.status}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* {status === "All" ? (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={colorsCode.colors.GRADIENT}
            style={Styles.roundContainer1}
          >
            <View>
              <Image
                style={[Styles.sentAndReceived2]}
                source={require("../../../assets/icons/currentSent.png")}
              />
              <Text style={Styles.sent}>Sent</Text>
              <Text style={Styles.justNow}>Just now</Text>
              <Text style={Styles.btcConstant}>+0.02562 BTC</Text>
            </View>
          </LinearGradient>
        ) : (
          <View />
        )} */}

        <View style={styles.list}>
          <FlatList
            data={datalist}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
            style={styles.listView}
          />
        </View>
      </View>
      <SentBitcoinModal
        visible={sendModalVisible}
        hideBack
        isAccept
        currentStep={3}
        sentFormData={sentFormData}
        callback={() => {
          setSendModalVisible(false);
          handleAccept(sentFormData);
        }}
        closeCallback={() => {
          setSendModalVisible(false);
        }}
        backCallback={() => {}}
      />
      <Toast />
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
