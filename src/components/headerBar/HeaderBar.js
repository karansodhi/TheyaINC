import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import styles from "./Styles";
import { useNavigation } from '@react-navigation/native';
import * as ImagePaths from "../../utils/ImagePaths.js";
const HeaderBar = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Image source={ImagePaths.HEADSET} style={styles.headset} />
      </Pressable>
    </View>
  );
};

export default HeaderBar;
