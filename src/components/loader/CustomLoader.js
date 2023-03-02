//#region "Start"
//#region "React Native Dependencies "
import * as React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import { colors } from "../../utils/ColorsCode";
//#endregion "Project Dependencies "
//#region "End"

const CustomLoader = (props) => {
  return (
    <>
      {/* {console.log("ActivityIndicator ==========>", props)} */}
      {props.loading && (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <ActivityIndicator size="large" color={colors.PRIMARY} />
            <Text style={styles.loadingTitle}>Loading...</Text>
          </View>
        </View>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  loading: state.loader.isShow,
});
export default connect(mapStateToProps)(CustomLoader);
