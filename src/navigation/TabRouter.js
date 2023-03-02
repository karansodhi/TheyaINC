//#region "Start"
//#region "React Native Dependencies "
import React from "react";
import { Image } from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import * as colorsCode from "../utils/ColorsCode.js";
import * as ImagePaths from "../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//#endregion "npm Dependencies "
//#region "End"

import Settings from "../screens/settings/Settings";
import Transactions from "../screens/transactions/Transactions";
import Vault from "../screens/vault/Vault";

import { useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();
const MyTab = ({ navigation }) => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  return (
    <Tab.Navigator
      initialRouteName="Vault"
      activeColor={ colorsCode.COLOR_YELLOW }
      inactiveColor={ colorsCode.COLOR_WHITE }
      barStyle={ {
        backgroundColor: colorsCode.COLOR_TAB_GREEN,
        position: "absolute",
        overflow: "hidden",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      } }
    >
      <Tab.Screen
        name="Vault"
        component={ Vault }
        options={ {
          tabBarLabel: "Vault",
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={ ImagePaths.TAB_SHIELD }
              style={ {
                width: wp("7%"),
                height: wp("7%"),
                resizeMode: "contain",
                tintColor: focused
                  ? colorsCode.COLOR_YELLOW
                  : colorsCode.COLOR_WHITE,
              } }
            />
          ),
        } }
      />
      <Tab.Screen
        name="Transactions"
        component={ Transactions }
        options={ {
          tabBarLabel: "Transactions",
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={ ImagePaths.TAB_TRANSCATION }
              style={ {
                width: wp("7%"),
                height: wp("7%"),
                resizeMode: "contain",
                tintColor: focused
                  ? colorsCode.COLOR_YELLOW
                  : colorsCode.COLOR_WHITE,
              } }
            />
          ),
        } }
      />
      <Tab.Screen
        name="Settings"
        component={ Settings }
        options={ {
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={ ImagePaths.TAB_NUT }
              style={ {
                width: wp("7%"),
                height: wp("7%"),
                resizeMode: "contain",
                tintColor: focused
                  ? colorsCode.COLOR_YELLOW
                  : colorsCode.COLOR_WHITE,
              } }
            />
          ),
        } }
      />
    </Tab.Navigator>
  );
};
export default MyTab;
