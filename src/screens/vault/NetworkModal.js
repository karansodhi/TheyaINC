import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { colors } from "../../utils/ColorsCode";
import { fontFamily } from "../../utils/FontFamily";
import Button from "../../../button/button";

const NetworkModal = ({
  visible,
  activeNetwork,
  closeCallback,
  callback,
  saveCallback,
}) => {
  return (
    <Modal
      onBackdropPress={closeCallback}
      isVisible={visible}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{
          padding: 16,
          backgroundColor: colors.WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
          paddingTop: 46,
        }}
      >
        <Text
          style={{ fontFamily: fontFamily.montserratSemiBold, fontSize: 24 }}
        >
          Select network
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.regular,
            fontSize: 17,
            textAlign: "center",
            paddingTop: 8,
            paddingBottom: 26,
            lineHeight: 20,
          }}
        >
          {`You can change it anytime from\nthe settings tab as well`}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.regular,
            fontSize: 14,
            paddingTop: 26,
          }}
        >
          Select the network
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback("testnet");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 16,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                borderWidth: 1,
                borderColor: colors.GOLD,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              {activeNetwork === "testnet" ? (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    backgroundColor: colors.GOLD,
                  }}
                />
              ) : (
                <View />
              )}
            </View>
            <Text
              style={{
                fontFamily: fontFamily.semiBold,
                color: colors.GREEN,
                fontSize: 18,
              }}
            >
              Testnet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback("mainnet");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 16,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                borderWidth: 1,
                borderColor: colors.GOLD,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              {activeNetwork === "mainnet" ? (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    backgroundColor: colors.GOLD,
                  }}
                />
              ) : (
                <View />
              )}
            </View>
            <Text
              style={{
                fontFamily: fontFamily.semiBold,
                color: colors.GREEN,
                fontSize: 18,
              }}
            >
              Mainnet
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          onPress={saveCallback}
          style={{
            height: 50,
            backgroundColor: colors.BLACK,
            marginBottom: 26,
            marginTop: 26,
          }}
          title={"Save and Continue"}
        />
      </View>
    </Modal>
  );
};

export default NetworkModal;
