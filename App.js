//#region "Start"

//#region "React Native Dependencies "
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { LogBox, Linking } from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import InitialRouter from "./src/navigation/DrawerRouter";
import CustomLoader from "./src/components/loader/CustomLoader";
//#endregion "Project Dependencies "

//#region "Redux Dependencies"
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./src/redux/reducers";
export const { store, persistor } = createStore();
//#endregion "Redux Dependencies "
import Toast from "react-native-toast-message";
//#region "Project Dependencies"
//#region "End"

// Context API
import Auth from "./src/context/store/Auth";
import { removeSession, storeSession } from "./src/utils/Session";
import {
  SESSION_USER_DETAIL,
  SET_UNIVERSAL_LINK,
} from "./src/utils/StringUtility";
// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();
// authenticate?stytch_token_type=magic_links&token=
const App = ({ navigation }) => {
  useEffect(() => {
    const getUrl = async () => {
      const universalLink = await Linking.getInitialURL();
      if (universalLink === null) {
        return;
      }
      console.log("GET UNIVERSAL LINK APP JS ==>", universalLink);
      // const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
      // console.log("DETAILS", userDetails);
    };
    getUrl();
  }, []);

  return (
    <Auth>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <StatusBar
            backgroundColor={COLOR_LINEAR_GRADIENT_ONE}
            barStyle="dark-content"
          /> */}
            <NavigationContainer>
              <>
                <InitialRouter />
                <CustomLoader />
                <Toast />
              </>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </Auth>
  );
};

export default App;
