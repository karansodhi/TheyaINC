import React, { useMemo, useCallback } from "react";
import {
  ActivityIndicator,
  View,
  Image,
  Text,
  Pressable
} from "react-native";
import * as ImagePaths from "../../utils/ImagePaths.js";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import LinearGradient from "react-native-linear-gradient";;
import WebView from 'react-native-webview'
import ApiConfig from "../../config";


const WebViews = ({ route, navigation }) => {
  const Loader = <View style={ styles.loaderContainer }><ActivityIndicator size="large" color={ 'black' } />
  </View>
  const emptyError = <View />
  const renderLoader = useCallback(() => Loader, [])
  const renderError = useCallback(() => emptyError, [])
  const webViewText = route.params?.mainText
  const source = useMemo(() => ({ uri: webViewText == 'Terms of use' ? ApiConfig.TERMS_AND_CONDITION : ApiConfig.PRIVACY_URL }), [webViewText])
  return (
    <LinearGradient
      start={ { x: 0, y: 0 } }
      end={ { x: 0, y: 1 } }
      colors={ colorsCode.colors.GRADIENT }
      style={ styles.mainContainer }
    >
      <View style={ styles.header }>
        <Pressable onPress={ () => navigation.goBack() } >
          <Image source={ ImagePaths.BACK } style={ styles.rightArrow } />
        </Pressable>
        { webViewText == 'Terms of use' ? <Text style={ styles.headerText }>Our terms and { "\n" }
          conditions</Text> : <Text style={ styles.headerText }>Our privacy policy</Text> }
      </View>
      <WebView
        source={ source }
        startInLoadingState={ true }
        automaticallyAdjustContentInsets={ false }
        renderLoading={ renderLoader }
        renderError={ renderError }
      />
    </LinearGradient >
  );
};


export default WebViews;
