import { Image, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React from "react";
import { WebView } from 'react-native-webview';
import Button from "../../../button/button";
// import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import Styles from "./Styles";
import axios from "axios";
import baseURL from "../../../assets/api/baseUrl";
import * as colorsCode from "../../utils/ColorsCode";
const SignupOne = ({ navigation }) => {
  const [email, setEmail] = React.useState("");

  const [error, setError] = React.useState("");
  // console.log("email=", email);

  const continuePressed = () => {
    if (email !== "") {
      navigation.navigate("Signup");
    }
  };
  const getMagicLink = () => {
    const user = {
      email,
    };
    console.log("user.email=", user.email);
    if (email == "") {
      setError("Please fill in your email and name");
    } else {
      console.log("success");
      navigation.navigate("Signup", { email: user.email });
    }
  };
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
        <TouchableOpacity onPress={() => navigation.navigate("RegisterLogin")}>
          {/* Icon */}
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
          textContentType='emailAddress'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          style={Styles.textInput}
          placeholder="Enter your email"
          placeholderTextColor={colorsCode.colors.GREY}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          // value={value}
        />

        {/* Button */}
        <Button
          style={Styles.btn}
          textStyle={Styles.btnText}
          textContentType='emailAddress'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          title="Continue"
          onPress={getMagicLink}
        />

        {/* Terms and Condition */}
        <Text style={Styles.termsAndConditions} >
          By continuing, you're agreeing to our <Text onPress={() => 
              <WebView
              source={{
                uri: 'https://www.theya.us/legal/terms'
              }}
              style={{marginTop: 20}}
            />
          }>Terms and</Text> <Text onPress={() => 
              <WebView
              source={{
                uri: 'https://www.theya.us/legal/privacy'
              }}
              style={{marginTop: 20}}
            />
          }>Privacy Policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default SignupOne;
