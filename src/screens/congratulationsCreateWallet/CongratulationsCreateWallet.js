//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import { HIDE_LOADER } from "../../redux/actions/ActionTypes";
import { getValueFromKeyChain } from "../../utils/BtcFunc";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import FaceIdModal from "../../components/faceIdModal/FaceIdModal";
import { loginUserApi } from "../../../assets/api/apiMethods";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import FingerprintScanner from 'react-native-fingerprint-scanner';

//#endregion "npm Dependencies "
//#region "End"
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";

const CongratulationsCreateWallet = ({
  route,
  userDetails,
  navigation,
  ...props
}) => {

  
  const dispatch = useDispatch();

  const [ permissionprovided,setCount] = useState(0);

  const context = useContext(AuthGlobal);
  console.log("context = ", context);
  // console.log("route from CongratulationWallet = ", route.params.token);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    initalCall();
  }, []);


  const enableFaceId = async () => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        // this.setState({biometryType});
        if(biometryType=='Face ID')
      {
        FingerprintScanner.authenticate({
          
        })
      }
      else
      {
          Alert.alert("Face ID failed, kindly try again",[
            {
              text: "OK",
              onPress: () => enableFaceId(),
              style:"cancel"
            }
          ])
      }
      })
      .catch((error) => console.log('isSensorAvailable error => ', error));
  };
  

  useEffect(() => {
    if(permissionprovided == 0){
      setModalVisible(true);
      setCount(permissionprovided+1)
    } else {
      enableFaceId();
    }
    dispatch({ type: HIDE_LOADER });
    getPublicPrivatKeys();
  }, []);

  const initalCall = async () => {
    const responseJSON = await loginUserApi(route.params.token);
    console.log("responseJSON = ", responseJSON);
    // console.log("user response = ", userDetails);
    loginUser(userDetails, context.dispatch);
  };

  const getPublicPrivatKeys = async () => {
    let credentials = await getValueFromKeyChain();
    if (credentials) {
      // console.log("credentials===>", credentials); //username == private key, password == all three keys
      console.log("ALL KEY===>", JSON.parse(credentials?.password)); //password == all keys 1. mnemonic 2. privateKey 3. publickey
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.subContainer}>
        <Image source={ImagePaths.GREEN_CHECKMARK} style={styles.checkMark} />
        <Text style={styles.congratulations}>Congratulations</Text>
        <Text style={styles.congratulationsDesc}>
          {`Lets build a seedless Bitcoin\nself-custody!`}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image source={ImagePaths.WAVE_2} style={styles.wave} />
          <Image source={ImagePaths.LOCK_2} style={styles.doller} />
        </View>
        <Text style={styles.congratulationsTitle}>Why it’s required</Text>
        <Text style={styles.congratulationsSub}>
          {`Secure your generational wealth\nwithout trusting any centralized\nexchange.`}
        </Text>
        <TouchableOpacity
          style={styles.createWalletContainer}
          onPress={() => {
            navigation.navigate("CreateWalletInfo");
          }}
        >
          <Text style={styles.createWalletTitle}>Create wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doItLaterContainer}
          onPress={() => navigation.navigate("MyTab")}
        >
          <Text style={styles.doItLaterTitle}>I’ll do it later</Text>
        </TouchableOpacity>
      </View>
      <FaceIdModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        navigation={navigation}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.registration.userDetails,
  };
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongratulationsCreateWallet);
