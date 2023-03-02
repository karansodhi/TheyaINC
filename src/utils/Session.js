import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeSession = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log("storeSession error ==> ", e);
  }
};

export const getSession = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    console.log("getSession error ==> ", e);
    return null;
  }
};

export const removeSession = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    console.log("removeSession error ==> ", e);
  }
};

export const testFuncSession = () => {
  console.log("****testFunc****");
};
