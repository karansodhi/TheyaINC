import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import LinearGradient from "react-native-linear-gradient";

const itemSkus = Platform.select({
  ios: ["com.theya.customerapp.1monthplan"],
  android: ["com.example.productId"],
});
const itemSubs = Platform.select({
  ios: ["6445648070"],
  android: ["test.sub"],
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const SubscribtionScreen = () => {
  const [state, setState] = useState({
    productList: [],
    receipt: "",
    availableItemsMessage: "",
  });

  const iapConnection = async () => {
    try {
      const result = await RNIap.initConnection();
      console.log("connection is => ", result);
      await RNIap.consumeAllItemsAndroid();
    } catch (err) {
      console.log("error in cdm => ", err);
    }
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      console.log("purchaseUpdatedListener", purchase);
      if (
        purchase.purchaseStateAndroid === 1 &&
        !purchase.isAcknowledgedAndroid
      ) {
        try {
          const ackResult = await acknowledgePurchaseAndroid(
            purchase.purchaseToken
          );
          console.log("ackResult", ackResult);
        } catch (ackErr) {
          console.warn("ackErr", ackErr);
        }
      }
      purchaseConfirmed();
      setState((prev) => ({
        ...prev,
        receipt: purchase.transactionReceipt,
      }));
      purchaseErrorSubscription = purchaseErrorListener((error) => {
        console.log("purchaseErrorListener", error);
      });
    });
  };

  useEffect(() => {
    iapConnection();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  const getItems = async () => {
    try {
      console.log("itemSkus[0]", itemSkus[0]);
      const products = await RNIap.getProducts(itemSkus);
      console.log("Products[0]", products[0]);
      setState((prev) => ({
        ...prev,
        productList: products,
      }));
      requestPurchase(itemSkus[0]);
    } catch (err) {
      console.log("getItems || purchase error => ", err);
    }
  };
  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log("Products => ", products);
      setState((prev) => ({
        ...prev,
        productList: products,
      }));
    } catch (err) {
      console.log("getSubscriptions error => ", err);
    }
  };
  const getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases => ", purchases);
      if (purchases && purchases.length > 0) {
        setState((prev) => ({
          ...prev,
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        }));
      }
    } catch (err) {
      console.warn(err.code, err.message);
      console.log("getAvailablePurchases error => ", err);
    }
  };
  const requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.log("requestPurchase error => ", err);
    }
  };
  const requestSubscription = async (sku) => {
    try {
      await getItems();
      await RNIap.requestSubscription(sku);
    } catch (err) {
      alert(err.toLocaleString());
    }
  };
  const purchaseConfirmed = () => {
    //you can code here for what changes you want to do in db on purchase successfull
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <View style={styles.subContainer}>
        <Text style={styles.congratulations}>Fantastic!</Text>
        <Text style={styles.congratulationsDesc}>
          {`Multi-device self custody is the\nfirst step towards financial\nfreedom. Secure your wealth with\na recovery key subscription plan.`}
        </Text>
        <LinearGradient
          start={{ x: 1, y: -1.5 }}
          end={{ x: 0, y: 1 }}
          colors={colorsCode.colors.GRADIENT2}
          style={styles.vaultContainer}
        >
          <Text style={styles.vaultTitle}>Theya vault</Text>
          <Text style={styles.price}>$150/year</Text>
          <View style={styles.listView}>
            <Text style={styles.listTitle}>Three layer security</Text>
            <Image
              source={ImagePaths.CHECK_MARK_YELLOW}
              style={styles.checkMark}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.listView}>
            <Text style={styles.listTitle}>Easy recovery of your keys</Text>
            <Image
              source={ImagePaths.CHECK_MARK_YELLOW}
              style={styles.checkMark}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.listView}>
            <Text style={styles.listTitle}>Multisig vault protection</Text>
            <Image
              source={ImagePaths.CHECK_MARK_YELLOW}
              style={styles.checkMark}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.listView}>
            <Text style={styles.listTitle}>Fully secured transactions</Text>
            <Image
              source={ImagePaths.CHECK_MARK_YELLOW}
              style={styles.checkMark}
            />
          </View>
          <View style={styles.line} />

          <View style={styles.listView}>
            <Text style={styles.listTitle}>24x7 customer support</Text>
            <Image
              source={ImagePaths.CHECK_MARK_YELLOW}
              style={styles.checkMark}
            />
          </View>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.createWalletContainer}
            onPress={() => getItems()}
          >
            <Text style={styles.createWalletTitle}>Subscribe now</Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.notSure}>Still not sure?</Text>
        <Text style={styles.trialText}>Try 30 Days Free</Text>
        <View style={styles.footerTxt}>
          <Text style={styles.conditionTxt}>
            Review our Terms and Conditions
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SubscribtionScreen);
