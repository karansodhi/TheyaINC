import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Styles";
import { colors } from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { fontFamily } from "../../utils/FontFamily";

const StepCard = ({
  isActive,
  isCompleted,
  callback,
  completedText,
  title,
  desc,
  image,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={isActive ? callback : null}
      style={[
        isActive || isCompleted ? styles.setpCard : styles.setpCardDisable,
      ]}
    >
      <LinearGradient
        start={{ x: 1.4, y: -2 }}
        end={{ x: 0, y: 1.1 }}
        colors={isActive || isCompleted ? colors.GRADIENT2 : colors.GRADIENT3}
        style={
          isActive
            ? styles.stepCardContainerActive
            : isCompleted
            ? styles.stepCardContainer
            : styles.stepCardDisable
        }
      >
        {isActive ? (
          <View style={{ alignItems: "center" }}>
            <Image style={{ width: 30, height: 30 }} source={image} />
            <Text
              style={{
                fontFamily: fontFamily.bold,
                fontSize: widthPercentageToDP(4.5),
                color: colors.WHITE,
                marginTop: 8,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.regular,
                fontSize: widthPercentageToDP(3.5),
                color: colors.PRIMARY,
                marginTop: 4,
              }}
            >
              {desc}
            </Text>
            <View
              style={{
                height: 50,
                width: widthPercentageToDP(50),
                borderRadius: 4,
                backgroundColor: colors.PRIMARY,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.bold,
                  fontSize: widthPercentageToDP(4.5),
                  color: colors.SECONDARY,
                }}
              >
                Setup now
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={isCompleted ? styles.setupTextCompleted : styles.setupText}
            >
              {isCompleted ? completedText : title}
            </Text>
            {isCompleted ? (
              <Image
                resizeMode="contain"
                style={{ width: 12, height: 12, marginLeft: 6 }}
                source={ImagePaths.CHECK_WHITE}
              />
            ) : (
              <View />
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StepCard;
