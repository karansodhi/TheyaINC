//#region "Start"
//#region "React Native Dependencies "
import { StyleSheet } from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import { COLOR_BACKGROUND, COLOR_BITCOIN } from "../../utils/ColorsCode";
//#endregion "Project Dependencies "
//#region "End"

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  headerSection: {
    marginTop: 15,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  balanceSection: {
    padding: 10,
    width: "90%",
    flexDirection: "row",
    borderColor: COLOR_BITCOIN,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  responseSection: {
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: COLOR_BITCOIN,
    borderWidth: 2,
    backgroundColor: "#FDEBD0",
    borderRadius: 10,
  },
  methodSection: {
    alignItems: "center",
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: COLOR_BITCOIN,
    borderWidth: 2,
    borderRadius: 10,
  },
  sendSection: {
    alignItems: "center",
    width: "90%",
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: COLOR_BITCOIN,
    borderWidth: 2,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 30,
  },
  balanceText: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  btnText: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  responseText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    borderColor: COLOR_BITCOIN,
    borderWidth: 2,
    width: "80%",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  methodButton: {
    color: COLOR_BITCOIN,
  },
  btn: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLOR_BITCOIN,
    marginVertical: 5,
    width: "80%",
  },
});
