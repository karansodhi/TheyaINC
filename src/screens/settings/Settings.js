import React from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";

import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";

import LinearGradient from "react-native-linear-gradient";
import Styles from "./Styles";
import HeaderBar from "../../components/headerBar/HeaderBar";
import ProfileSettings from "../../components/settings/ProfileSettings";
import Button from "../../../button/button";
import { removeSession } from "../../utils/Session";
import { SESSION_USER_DETAIL } from "../../utils/StringUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";

const data = [
  // {
  //   icon: require("../../../assets/icons/profile.png"),
  //   mainText: "Edit profile",
  //   subText: "Name, email and password",
  //   navigation: ''

  // },
  {
    icon: require("../../../assets/icons/device_mobile_speaker.png"),
    mainText: "App version history",
    subText: "See the changes happend over versions",
    navigation: "",
  },
  {
    icon: require("../../../assets/icons/cube.png"),
    mainText: "Blockchain network",
    subText: "mainnet BTC",
    navigation: "",
  },
  {
    icon: require("../../../assets/icons/wrench.png"),
    mainText: "Reconfigure wallet",
    subText: "Reset the mobile key and recovery key",
    navigation: "",
  },
  {
    icon: require("../../../assets/icons/shieldChevron.png"),
    mainText: "Wallet health check",
    subText: "Back everything on your device",
    navigation: "",
  },
];
const Settings = ({ navigation, ...props }) => {
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
          style={Styles.roundContainer}
        >
          <HeaderBar title="Settings" />
        </LinearGradient>
        <View>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <ProfileSettings
                  icon={item.icon}
                  mainText={item.mainText}
                  subText={item.subText}
                  navigationRoute={item?.navigation}
                />
              </View>
            );
          })}
        </View>
        <Button
          style={Styles.btn}
          title="Logout"
          onPress={async () => {
            Alert.alert("Theya", "Do you want to logout?", [
              {
                text: "Yes",
                onPress: async () => {
                  AsyncStorage.clear();
                  await Keychain.resetGenericPassword();
                  navigation.navigate("RegisterLogin");
                },
              },
              { text: "No", onPress: () => console.log("OK Pressed") },
            ]);
          }}
        />
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
