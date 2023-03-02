import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useContext } from "react";
import Button from "../../../button/button";

import LinearGradient from "react-native-linear-gradient";
import * as colorsCode from "../../utils/ColorsCode";

import Styles from "./Styles";
import { connect, useDispatch } from "react-redux";
import { registerUserApi } from "../../../assets/api/apiMethods";
import { registerUser } from "../../redux/actions";

// context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";
import axios from "axios";
import baseURL from "../../../assets/api/baseUrl";
import { HIDE_LOADER, SHOW_LOADER } from "../../redux/actions/ActionTypes";
import {
  SESSION_USER_DETAIL,
  SESSION_USER_WALLET,
} from "../../utils/StringUtility";

const Signup = ({ navigation, userDetails, registerUser, route }) => {
  const context = useContext(AuthGlobal);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState(
    route.params && route.params.email ? route.params.email : ""
  );
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  React.useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      // navigate user to the profile
      navigation.navigate("CongratulationsCreateWallet");
    }
  }, [context.stateUser.isAuthenticated]);

  const getMagicLink = async () => {
    const user = {
      email,
      name,
    };

    if (email == "" || name == "") {
      setError("Please fill in your email and name");
    } else {
      registerUser(user);
      // registerUserApi(user);
      try {
        dispatch({ type: SHOW_LOADER });

        console.log(
          "getMagicLink UTL ===>",
          `${baseURL}/register_or_login`,
          user
        );

        const res = await axios.post(`${baseURL}/register_or_login`, user);
        console.log("getMagicLink Res ===>", res.data);
        if (res.status == 200) {
          if (res.data.user_id && res.data.session_token) {
            instantLogin(res.data);
          } else {
            dispatch({ type: HIDE_LOADER });
            navigation.navigate("Message");
          }
        }
      } catch (err) {
        dispatch({ type: HIDE_LOADER });
        console.log("error ===> ", err);
      }
    }
  };

  const instantLogin = async (data) => {
    navigation.navigate("CongratulationsCreateWallet");
    // const URL =
    //   "https://dev.theya.us/v1/authenticate?token=" + data.session_token;
    // try {
    //   const response = await axios.get(URL);
    //   if (response.status === 200) {
    //     const data = response.data;
    //     const finalUniversalLink = data.universal_link;
    //     const finalArrayOfUlink = finalUniversalLink.split("/");
    //     if (finalArrayOfUlink.length > 0) {
    //       const userID = finalArrayOfUlink[0];
    //       const sessionToken = finalArrayOfUlink[1];
    //       const userDetails = {
    //         userID: userID,
    //         sessionToken: sessionToken,
    //         name:
    //           data && data.user_details && data.user_details.name
    //             ? data.user_details.name
    //             : "",
    //       };
    //       storeSession(SESSION_USER_DETAIL, JSON.stringify(userDetails));
    //     }

    //     if (data.wallet_created) {
    //       navigation.navigate("MyTab");
    //       const Dict = {
    //         address: data.wallet_address ? data.wallet_address : "",
    //         script: "",
    //         type: "",
    //         witnessScript: "",
    //       };
    //       storeSession(SESSION_USER_WALLET, JSON.stringify(Dict));
    //     } else {
    //       navigation.navigate("CongratulationsCreateWallet");
    //     }
    //     dispatch({ type: HIDE_LOADER });
    //   } else {
    //     dispatch({ type: HIDE_LOADER });
    //     Toast.show({
    //       type: "error",
    //       text1: "Something went wrong!",
    //     });
    //   }
    // } catch (err) {
    //   dispatch({ type: HIDE_LOADER });
    //   Toast.show({
    //     type: "error",
    //     text1: "Something went wrong!",
    //   });
    // }
  };

  // console.log("email=", email);
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {/* BackIcon */}
        <TouchableOpacity onPress={() => navigation.navigate("SignupOne")}>
          <Image
            resizeMode="contain"
            source={require("../../../assets/icons/back.png")}
            style={Styles.right_arrow}
          />
        </TouchableOpacity>

        {/* Heading */}
        <Text style={Styles.text1}>Welcome to Theya</Text>
        <Text style={Styles.text2}>
          {`Just enter your email address\nand get a magic link to get in`}
        </Text>

        {/* forms */}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={email}
          textContentType="emailAddress"
          placeholder="Enter your email address"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholderTextColor={colorsCode.colors.GREY}
          style={Styles.input1}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          // editable={false}
          // value={value}
        />
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="Your name"
          placeholderTextColor={colorsCode.colors.GREY}
          style={Styles.input2}
          onChangeText={(text) => setName(text)}
          // value={value}
        />

        {/* Button */}
        <Button
          style={Styles.btn}
          textStyle={Styles.btnText}
          title="Get a magic link"
          onPress={getMagicLink}
        />
        {/* Terms and Conditions */}
        <Text style={Styles.termsAndConditions}>
          By continuing, you're agreeing to our{" "}
          <Text
            onPress={() => (
              <WebView
                source={{
                  uri: "https://www.theya.us/legal/terms",
                }}
                style={{ marginTop: 20 }}
              />
            )}
          >
            Terms and
          </Text>{" "}
          <Text
            onPress={() => (
              <WebView
                source={{
                  uri: "https://www.theya.us/legal/privacy",
                }}
                style={{ marginTop: 20 }}
              />
            )}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
