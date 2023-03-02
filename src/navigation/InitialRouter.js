import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import Registration from "../screens/registration/Registration";
import CongratulationsCreateWallet from "../screens/congratulationsCreateWallet/CongratulationsCreateWallet";
import CreateWalletInfo from "../screens/createWalletInfo/CreateWalletInfo";
import SetupKeys from "../screens/setupKeys/SetupKeys";
import SetupMobileKeysStepOne from "../screens/setupMobileKeysStepOne/SetupMobileKeysStepOne";
import SetupMobileKeysStepTwo from "../screens/setupMobileKeysStepTwo/SetupMobileKeysStepTwo";
import AdditionalMobileKeysStepOne from "../screens/additionalMobileKeysStepOne/AdditionalMobileKeysStepOne";
import AdditionalMobileKeysStepTwo from "../screens/additionalMobileKeysStepTwo/AdditionalMobileKeysStepTwo";
import AdditionalMobileKeysStepThree from "../screens/additionalMobileKeysStepThree/AdditionalMobileKeysStepThree";
import AdditionalMobileKeysStepFour from "../screens/additionalMobileKeysStepFour/AdditionalMobileKeysStepFour";
import RegisterLogin from "../screens/registrationLogin/RegistrationLogin";
import SignupOne from "../screens/signupOne/SignupOne";
import Signup from "../screens/signup/Signup";
import Message from "../screens/message/Message";
import SubscribtionScreen from "../screens/subcribtionScreen/SubscribtionScreen";
import RecoveryQuestionOne from "../screens/recoveryQuestionOne/RecoveryQuestionOne";
import RecoveryQuestionTwo from "../screens/recoveryQuestionTwo/RecoveryQuestionTwo";
import RecoveryQuestionThree from "../screens/recoveryQuestionThree/RecoveryQuestionThree";
import ConfirmQuestion from "../screens/confirmQuestion/ConfirmQuestion";
import HighlyRecoveryKey from "../screens/highlyRecoveryKey/HighlyRecoveryKey";
import KeySetupComplete from "../screens/keySetupComplete/KeySetupComplete";
import Dashboard from "../screens/dashboard/Dashboard";
import Vault from "../screens/vault/Vault";
import Transactions from "../screens/transactions/Transactions";
import Settings from "../screens/settings/Settings";
import MyTab from "./TabRouter";
import QRCodeGenerate from "../screens/secondaryKey/QRCodeGenerate";
import HowItWorks from "../screens/secondaryKey/HowItWorks";
import KeyCreated from "../screens/secondaryKey/KeyCreated";
import Wallet from "../screens/wallet/Wallet";
import splash from "../screens/splash/splash";
import WebView from "../screens/webView/WebView";
import SecondaryPairedStepOne from "../screens/secondaryKey/SecondaryPairedStepOne/SecondaryPairedStepOne";
import SecondaryPairedStepTwo from "../screens/secondaryKey/SecondaryPairedStepTwo/SecondaryPairedStepTwo";
// import MyTransactionTabs from "./MyTransactionTabs";

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
};
const InitialRouter = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Login" component={Login} options={screenOptions} />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={screenOptions}
      />
      {/* <Stack.Screen
        name="FaceIDModel"
        component={FaceIdModal}
        options={screenOptions}
      /> */}
      <Stack.Screen name="Splash" component={splash} options={screenOptions} />
      <Stack.Screen
        name="RegisterLogin"
        component={RegisterLogin}
        options={screenOptions}
      />
      <Stack.Screen
        name="SignupOne"
        component={SignupOne}
        options={screenOptions}
      />
      <Stack.Screen name="Signup" component={Signup} options={screenOptions} />

      <Stack.Screen
        name="Message"
        component={Message}
        options={screenOptions}
      />
      <Stack.Screen name="Wallet" component={Wallet} options={screenOptions} />

      <Stack.Screen
        name="CongratulationsCreateWallet"
        component={CongratulationsCreateWallet}
        options={screenOptions}
      />
      <Stack.Screen
        name="CreateWalletInfo"
        component={CreateWalletInfo}
        options={screenOptions}
      />
      <Stack.Screen
        name="SetupKeys"
        component={SetupKeys}
        options={screenOptions}
      />
      <Stack.Screen
        name="SetupMobileKeysStepOne"
        component={SetupMobileKeysStepOne}
        options={screenOptions}
      />
      <Stack.Screen
        name="SetupMobileKeysStepTwo"
        component={SetupMobileKeysStepTwo}
        options={screenOptions}
      />
      <Stack.Screen
        name="AdditionalMobileKeysStepOne"
        component={AdditionalMobileKeysStepOne}
        options={screenOptions}
      />
      <Stack.Screen
        name="AdditionalMobileKeysStepTwo"
        component={AdditionalMobileKeysStepTwo}
        options={screenOptions}
      />
      <Stack.Screen
        name="AdditionalMobileKeysStepThree"
        component={AdditionalMobileKeysStepThree}
        options={screenOptions}
      />
      <Stack.Screen
        name="AdditionalMobileKeysStepFour"
        component={AdditionalMobileKeysStepFour}
        options={screenOptions}
      />
      <Stack.Screen
        name="SubscribtionScreen"
        component={SubscribtionScreen}
        options={screenOptions}
      />

      <Stack.Screen
        name="RecoveryQuestionOne"
        component={RecoveryQuestionOne}
        options={screenOptions}
      />

      <Stack.Screen
        name="RecoveryQuestionTwo"
        component={RecoveryQuestionTwo}
        options={screenOptions}
      />

      <Stack.Screen
        name="RecoveryQuestionThree"
        component={RecoveryQuestionThree}
        options={screenOptions}
      />

      <Stack.Screen
        name="ConfirmQuestion"
        component={ConfirmQuestion}
        options={screenOptions}
      />

      <Stack.Screen
        name="HighlyRecoveryKey"
        component={HighlyRecoveryKey}
        options={screenOptions}
      />

      <Stack.Screen
        name="KeySetupComplete"
        component={KeySetupComplete}
        options={screenOptions}
      />

      <Stack.Screen name="MyTab" component={MyTab} options={screenOptions} />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={screenOptions}
      />

      <Stack.Screen name="Vault" component={Vault} options={screenOptions} />
      <Stack.Screen
        name="WebView"
        component={WebView}
        options={screenOptions}
      />

      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={screenOptions}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={screenOptions}
      />

      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={screenOptions}
      />

      <Stack.Screen
        name="KeyCreated"
        component={KeyCreated}
        options={screenOptions}
      />

      <Stack.Screen
        name="QRCodeGenerate"
        component={QRCodeGenerate}
        options={screenOptions}
      />
      <Stack.Screen
        name="SecondaryPairedStepOne"
        component={SecondaryPairedStepOne}
        options={screenOptions}
      />

      <Stack.Screen
        name="SecondaryPairedStepTwo"
        component={SecondaryPairedStepTwo}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default InitialRouter;
