import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, StatusBar } from "react-native";
import PlayScreen from "./screens/PlayScreen";
import RecordScreen from "./screens/RecordScreen";
import globalStyles from "./style/styles";

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      <Tab.Navigator
        style={styles.sty}
        tabBarOptions={{
          tabStyle: {
            justifyContent: "center",
          },
          activeTintColor: "green",
          inactiveBackgroundColor: globalStyles.mainBackgroundGreen,
          activeBackgroundColor: globalStyles.mainBackgroundBrown,
        }}
      >
        <Tab.Screen name="RecordScreen" component={RecordScreen} screen />
        <Tab.Screen name="PlayScreen" component={PlayScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  sty: {
    backgroundColor: "black",
  },
});

// screenOptions={({ route }) => ({
//   tabBarIcon: ({ color, size }) => {
//     color = "yellow";
//     size = 40;
//     return (
//       <TouchableOpacity name={route.name} size={size} color={color} />
//     );
//   },
// })}
