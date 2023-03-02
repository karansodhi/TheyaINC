import { createDrawerNavigator } from "@react-navigation/drawer";


import Support from "../components/support/Support";
import MyDrawer from "./InitialRouter";

const Drawer = createDrawerNavigator();
const DrawerRouter = () => {
  console.log("drawer navigation");
  return (
    <Drawer.Navigator
    initialRouteName="Vault"
    screenOptions={{
        drawerPosition: "right",
        drawerStyle: {
          width: "80%",
        },
      }}
      drawerContent={(props) => <Support {...props} />}
    >
      <Drawer.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerRouter;
