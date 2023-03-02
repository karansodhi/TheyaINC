import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import styles from "./Styles";
import * as ImagePaths from "../../utils/ImagePaths.js";
import * as colorsCode from "../../utils/ColorsCode";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { GET_BALANCE } from "../../utils/StringUtility";
import { getSession } from "../../utils/Session";
import { TouchableOpacity } from "react-native";
import { fontFamily } from "../../utils/FontFamily";

const VaultHeader = ({
  secondaryDevice,
  walletBalance,
  userData,
  supportCallback,
  isWalletActive,
  networkCallback,
  activeNetwork,
}) => {
  return (
    <LinearGradient
      start={{ x: 1.5, y: -2 }}
      end={{ x: 1.6, y: 1.1 }}
      colors={colorsCode.colors.GRADIENT2}
      style={styles.roundContainer}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Hi, ${
          userData.name ? userData.name : ""
        }`}</Text>
        <TouchableOpacity onPress={supportCallback}>
          <Image source={ImagePaths.HEADSET} style={styles.headset} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={isWalletActive ? ImagePaths.BTC_ROUND : ImagePaths.BTC_ERROR}
          style={styles.logo}
        />
      </View>
      {secondaryDevice ? (
        <View style={styles.subTitleContainer2}>
          <Image source={ImagePaths.LOCK_GREEN} style={styles.lock} />
          <Text style={styles.subTitle}>
            {`This device is configued\nas the secondary key for\nBinse’s Theya wallet`}
          </Text>
        </View>
      ) : (
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>
            {isWalletActive ? `Secured with` : "Not secured with"}
            <Text style={{ color: colorsCode.COLOR_GOLD }}> multisig </Text>
          </Text>
          <Image
            source={
              isWalletActive ? ImagePaths.LOCK_GREEN : ImagePaths.OPEN_GREEN
            }
            style={styles.lock}
          />
        </View>
      )}

      {isWalletActive && !secondaryDevice ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 5,
                  marginBottom: 5,
                  fontSize: widthPercentageToDP("10%"),
                },
              ]}
            >
              {walletBalance?.balance?.confirmedBalance?.amount}{" "}
              {walletBalance?.balance?.confirmedBalance?.unit}
            </Text>
            <Text
              style={[styles.currenyText, { color: colorsCode.COLOR_GOLD }]}
            >
              $00.00
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity
        onPress={networkCallback}
        activeOpacity={1}
        style={{
          height: heightPercentageToDP(3.5),
          backgroundColor: colorsCode.colors.LIGHT,
          borderRadius: 16,
          width: widthPercentageToDP(45),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 10 / 2,
            backgroundColor:
              activeNetwork === "mainnet"
                ? colorsCode.colors.GREEN_2
                : colorsCode.colors.GOLD,
            marginRight: 6,
          }}
        />
        <Text style={{ fontFamily: fontFamily.semiBold, fontSize: 15 }}>
          {activeNetwork === "mainnet" ? `Bitcoin Mainnet` : `Bitcoin Testnet`}
        </Text>
        <Image
          resizeMode="contain"
          style={{ width: 12, height: 12, marginLeft: 6 }}
          source={ImagePaths.DOWN_ARROW}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default VaultHeader;
