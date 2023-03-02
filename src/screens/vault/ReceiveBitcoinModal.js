import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import { ImageBackground } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Toast from "react-native-toast-message";

const ReceiveBitcoinModal = ({
  visible,
  closeCallback,
  address,
  copyCallback,
}) => {
  return (
    <Modal
      isVisible={ visible }
      onBackdropPress={ closeCallback }
      style={ styles.modal }
    >
      {/* <View style={{ position: "absolute", top: 100 }}>
        <View style={{ width: 200, height: 10, backgroundColor: "red" }}></View>
      </View> */}
      <View style={ styles.modalContainer }>
        <View style={ styles.receiveBtnSmall }>
          <Image
            resizeMode="contain"
            source={ require("../../../assets/icons/down.png") }
            style={ styles.iconSmall }
          />
        </View>
        <Text style={ styles.modalTitle }>Receive bitcoin</Text>
        <Text style={ styles.modalSubTitle }>
          { `Scan this QR code or copy the\nwallet address` }
        </Text>
        <View style={ styles.qrContainer }>
          <QRCode value={ address } size={ 280 } />
        </View>
        {/* <Image
          resizeMode="contain"
          source={require("../../../assets/placeholder/qr.png")}
          style={{ height: 300 }}
        /> */}
        <ImageBackground
          resizeMode="contain"
          source={ require("../../../assets/icons/dotted_line.png") }
          style={ styles.dottedContainer }
        >
          <View style={ { flexShrink: 1 } }>
            <Text style={ styles.addressText }>{ address }</Text>
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={ () => {
            copyCallback(address);
          } }
          style={ styles.copyBtn }
        >
          <Text style={ styles.copyBtnText }>Copy wallet address</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReceiveBitcoinModal;
