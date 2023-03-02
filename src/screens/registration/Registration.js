//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
//#endregion "Project Dependencies "
//#region "End"

const Registration = ({ navigation, ...props }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <Text>This is Registration screen</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
// export default Registration;
