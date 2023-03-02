import axios from "axios";
import baseURL from "./baseUrl";

export const registerUserApi = async (user) => {
  console.log("user from registerUserApi=", user);
  try {
    const res = await axios.post(`${baseURL}/register_or_login`, user);
    if (res.status == 200) {
      console.log("res.data=", res.data);
      // await AsyncStorage.setItem("is_existing_user", true);
      console.log(`We've sent you magic link ${user.email.toLowerCase()}`);
    } else {
      console.log("internal server error");
    }
  } catch (error) {
    console.log("errror=", error);
  }
};

export const loginUserApi = async (token) => {
  try {
    console.log("token = ", token);
    const res = await axios.get(`${baseURL}/authenticate?token=${token}`);
    if (res.status == 200) {
      console.log("res of authenticate api =", res.data);
      console.log("universal link = ", res.data.universal_link);
      return res.data;
    }
  } catch (error) {
    console.log("errror=", error);
  }
};
