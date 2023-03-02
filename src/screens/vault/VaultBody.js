import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";
import React from "react";
import * as colorsCode from "../../utils/ColorsCode";
import { useNavigation } from "@react-navigation/native";

const VaultBody = ({ isActive, callback, secondaryDevice }) => {
  const navigation = useNavigation();
  return (
    <View>
      {secondaryDevice ? (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.continueContainer}
            onPress={() => {
              callback("transaction");
            }}
          >
            <Text style={styles.continueContainerTitle}>See transactions</Text>
          </TouchableOpacity>
          <Text style={styles.titleDesc}>
            {`You need to authorize each\ntransaction to get it completed`}
          </Text>
        </View>
      ) : isActive ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 60,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback("sent");
            }}
            style={styles.sentContainer}
          >
            <View style={styles.sentBtn1}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/up.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.activeBtnText}>Send BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback("receive");
            }}
            style={styles.receiveContainer}
          >
            <View style={styles.receiveBtn}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/down.png")}
                style={styles.icon}
              />
            </View>
            <Text style={styles.activeBtnText}>Receive BTC</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.note}>Your wallet isn’t created</Text>
          <TouchableOpacity
            style={styles.continueContainer2}
            onPress={() => {
              // callback("create");
              navigation.navigate("CreateWalletInfo");
            }}
          >
            <Text style={styles.continueContainerTitle}>Create wallet</Text>
          </TouchableOpacity>

          <Text style={styles.titleDesc2}>To get started</Text>
        </View>
      )}
    </View>
  );
};

export default VaultBody;
