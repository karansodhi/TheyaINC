//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../../utils/ColorsCode";
import * as ImagePaths from "../../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//#endregion "npm Dependencies "
//#region "End"

const SecondaryPairedStepOne = ({ navigation, ...props }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} />
      {/* <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity> */}
      <View style={styles.subContainer}>
        <LinearGradient
          start={{ x: 1.5, y: -2 }}
          end={{ x: 1.6, y: 1.1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={styles.roundContainer}
        >
          <Image source={ImagePaths.ORANGE_CHECK} style={styles.checkMark} />
          <Text style={styles.title}>
            {`Successfully linked\nthis device with\nyour primary device`}
          </Text>
          <Text style={styles.titleDesc}>
            Now you can back up this{"\n"} secondary mobile key to your{"\n"}{" "}
            iCloud account
          </Text>
        </LinearGradient>
        <Image source={ImagePaths.ICLOUD} style={styles.checkMark2} />
        <Text style={[styles.title2]}>Back up to iCloud</Text>
        <Text style={styles.titleDesc2}>
          You can access this mobile key{"\n"}even if your device is lost or
          {"\n"}damaged
        </Text>

        <TouchableOpacity
          style={styles.continueContainer}
          onPress={() => {
            setIsShowModal(false);
            navigation.navigate("SecondaryPairedStepTwo");
          }}
        >
          <Text style={styles.continueContainerTitle}>Back up to iCloud</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doItLaterContainer}
          onPress={() => {
            setIsShowModal(true);
          }}
        >
          <Text style={styles.doItLaterTitle}>Proceed without back up</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => {
          console.log("clsoed modal");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Image
              source={ImagePaths.RED_ICLOUD}
              style={[styles.checkMark, { marginTop: wp("10%") }]}
            />
            <Text style={styles.title2}>
              Sure to procced{"\n"}without back up?
            </Text>
            <Text style={styles.titleDesc2}>
              It can’t be recovered or{"\n"}estored If you don’t keep a{"\n"}
              back up of your mobile key, in{"\n"}case of a damage or losing of
              {"\n"}your device.
            </Text>

            <TouchableOpacity
              style={[
                styles.continueContainer,
                { backgroundColor: colorsCode.COLOR_YELLOW, width: wp("50%") },
              ]}
              onPress={() => {
                setIsShowModal(false);
                navigation.navigate("SecondaryPairedStepTwo");
              }}
            >
              <Text style={styles.continueContainerTitle}>
                Back up to iCloud
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.doItLaterContainer}
              onPress={() => {
                setIsShowModal(false);
              }}
            >
              <Text style={styles.doItLaterTitle}>Proceed without back up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryPairedStepOne);
