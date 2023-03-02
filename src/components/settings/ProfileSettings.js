import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";

const ProfileSettings = ({ icon, mainText, subText, navigationRoute }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={Styles.container}
      onPress={() =>
        navigation.navigate(navigationRoute, {
          fromSetting: true,
        })
      }
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Image style={Styles.icon1} source={icon} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={Styles.mainText}>{mainText}</Text>
              {(mainText === "Reconfigure wallet" ||
                mainText === "Blockchain network") && (
                <Image
                  style={Styles.commingSoon}
                  source={require("../../../assets/icons/commingsoon.png")}
                />
              )}
            </View>
            <Text style={Styles.subText}>{subText}</Text>
          </View>
        </View>

        {mainText === "App version history" ? (
          <Text style={Styles.versionText}>v0.01</Text>
        ) : (
          <Image
            style={Styles.rightArrow}
            source={require("../../../assets/icons/right_arrow.png")}
          />
        )}
      </View>
    </Pressable>
  );
};

export default ProfileSettings;
