import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  AppState,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";
import React, { useRef, useContext, useEffect } from "react";
import Styles from "./Styles";
import LinearGradient from "react-native-linear-gradient";
import * as colorsCode from "../../utils/ColorsCode";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { storeSession } from "../../utils/Session.js";
import { SHOW_LOADER, HIDE_LOADER } from "../../redux/actions/ActionTypes";
import Toast from "react-native-toast-message";
// context
import AuthGlobal from "../../context/store/AuthGlobal";
import {
  SESSION_USER_DETAIL,
  SESSION_USER_WALLET,
  SET_UNIVERSAL_LINK,
} from "../../utils/StringUtility";

const Message = ({ navigation, route, userDetails }) => {
  const context = useContext(AuthGlobal);
  // console.log("router from message= ", route);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      if (event !== null) {
        // console.log("GET ULINK MESSAGE JS event==>", event);
        const universalLink = event.url;
        // console.log("GET ULINK MESSAGE JS universalLink==>", universalLink);
        const arrayOfUlink = universalLink.split("&token=");
        if (universalLink.length > 0) {
          const sessionToken = arrayOfUlink[1];
          console.log("GET ULINK MESSAGE JS sessionToken==>", sessionToken);
          const URL =
            "https://dev.theya.us/v1/authenticate?token=" + sessionToken;
          console.log("GET ULINK MESSAGE JS URL==>", URL);
          dispatch({ type: SHOW_LOADER });
          axios
            .get(URL)
            .then(function (response) {
              // handle success
              // console.log(response);
              if (response.status == 200) {
                const data = response.data;
                console.log("GET ULINK MESSAGE JS response==>", data);
                const finalUniversalLink = data.universal_link;
                console.log(
                  "GET ULINK MESSAGE JS finalUniversalLink==>",
                  finalUniversalLink
                );
                const finalArrayOfUlink = finalUniversalLink.split("/");
                console.log(
                  "GET ULINK MESSAGE JS finalUniversalLink==>",
                  finalArrayOfUlink
                );

                if (finalArrayOfUlink.length > 0) {
                  const userID = finalArrayOfUlink[0];
                  const sessionToken = finalArrayOfUlink[1];

                  // const userDetails = {
                  //   userID: userID,
                  //   sessionToken: sessionToken,
                  // };

                  const userDetails = {
                    userID: userID,
                    sessionToken: sessionToken,
                    name:
                      data && data.user_details && data.user_details.name
                        ? data.user_details.name
                        : "",
                  };

                  //store user id and session tolen in session
                  storeSession(
                    SESSION_USER_DETAIL,
                    JSON.stringify(userDetails)
                  );

                  console.log(
                    "GET ULINK MESSAGE JS userDetails==>",
                    userDetails
                  );
                }
                dispatch({ type: HIDE_LOADER });
                if (data.wallet_created) {
                  const dictTestNetWallet = {
                    address: data.wallet_address
                      ? data.wallet_address?.testnet
                      : "",
                    script: "",
                    type: "",
                    witnessScript: "",
                  };
                  console.log(
                    "P2RET dictTestNetWallet==>",
                    JSON.stringify(dictTestNetWallet)
                  );
                  storeSession(
                    SESSION_USER_WALLET,
                    JSON.stringify(dictTestNetWallet)
                  );

                  const dictMainnetWallet = {
                    address: data.wallet_address
                      ? data.wallet_address?.mainnet
                      : "",
                    script: "",
                    type: "",
                    witnessScript: "",
                  };
                  console.log(
                    "P2RET dictMainnetWallet==>",
                    JSON.stringify(dictMainnetWallet)
                  );
                  storeSession(
                    SESSION_USER_WALLET,
                    JSON.stringify(dictMainnetWallet)
                  );

                  navigation.navigate("MyTab");
                } else {
                  navigation.navigate("CongratulationsCreateWallet");
                }
                // navigation.navigate("CongratulationsCreateWallet");
              } else {
                Toast.show({
                  type: "error",
                  text1: "Something went wrong!",
                });
                dispatch({ type: HIDE_LOADER });
              }
            })
            .catch(function (error) {
              // handle error
              // console.log(error);
              console.log("GET ULINK MESSAGE JS error==>", error);
              dispatch({ type: HIDE_LOADER });
            });
        }
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // tempLogin();
  }, []);

  const tempLogin = () => {
    const userDetails = {
      userID: "user-test-8f88e812-bc88-4d93-b4fc-1116fe7ee8a7",
      sessionToken: "Ayw9gqhKpGLiTZowm-a1zfwqgj9r18ARJSsiJ5wqWdxr",
    };

    //store user id and session tolen in session
    storeSession(SESSION_USER_DETAIL, JSON.stringify(userDetails));

    console.log("GET ULINK MESSAGE JS userDetails==>", userDetails);

    dispatch({ type: HIDE_LOADER });
    navigation.navigate("CongratulationsCreateWallet");
  };

  React.useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      // navigate user to the profile
      navigation.navigate("CongratulationsCreateWallet");
    }
  }, [context.stateUser.isAuthenticated]);
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
    >
      <StatusBar barStyle={"light-content"} />
      {/* white background */}
      <LinearGradient
        start={{ x: 1.5, y: -2 }}
        end={{ x: 1.6, y: 1.1 }}
        colors={colorsCode.colors.GRADIENT2}
        style={Styles.topContainer}
      >
        {/* BackIcon */}
        <TouchableOpacity
          style={Styles.btnContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/icons/white_arrow.png")}
            style={Styles.right_arrow}
          />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          {/* green right tick */}
          <Image
            resizeMode="contain"
            source={require("../../../assets/icons/green_checkmark.png")}
            style={Styles.greenTick}
          />

          {/*  text-1 */}
          <Text style={Styles.text1}>{`We've sent you\na magic link`}</Text>

          {/* text-2 */}
          <Text style={Styles.text2}>
            {`Just check for a magic link\nsent to ${userDetails.email}`}
          </Text>
        </View>
      </LinearGradient>

      <View>
        {/* ? icons */}
        <Image
          resizeMode="contain"
          source={require("../../../assets/icons/orange_question.png")}
          style={Styles.questionMark}
        />
        {/* Text-3 */}
        <Text style={Styles.text3}>How to proceed?</Text>

        {/* Text-4 */}
        <Text style={Styles.text4}>
          {`Open your mail application to get\nthis magic link. And confirm it by\nclicking the 'Proceed' button. Done!\nYou're good to go`}
        </Text>
      </View>

      <TouchableOpacity
        style={Styles.openContainer}
        onPress={() => {
          Linking.openURL("message://");
          BackHandler.exitApp();
        }}
      >
        <Text style={Styles.openMail}>
          Open Mail
          {/* Icon */}
        </Text>
        <Image
          source={require("../../../assets/icons/right_arrow.png")}
          style={Styles.icon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.registration.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user) => dispatch(registerUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
