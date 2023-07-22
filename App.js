import { useEffect } from "react";
import { View, StatusBar, BlurView, StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./src/screens/HomeScreen";
import FavScreen from "./src/screens/FavScreen";
import ActractiveScreen from "./src/screens/ActractiveScreen";

import {
  FAVORITE_NEWS_KEY,
  EventContext,
  RESTORE_STATE,
  useEventState,
} from "./src/misc/new";

const Tab = createBottomTabNavigator();

export default function App() {
  const [state, dispatch, newContext] = useEventState();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let current;

      try {
        const fetchedItem = await AsyncStorage.getItem(FAVORITE_NEWS_KEY);
        current = JSON.parse(fetchedItem);
        if (current === null) {
          current = [];
        }
      } catch (exception) {
        console.log(exception);
      }

      dispatch({ type: RESTORE_STATE, ids: current });
    };
    bootstrapAsync();
  }, []);

  return (
    <>
      <EventContext.Provider value={newContext}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: { position: "absolute", paddingTop: 10 },
              tabBarIcon: () => {
                return route.name == "Home" ? (
                  <Ionicons name="home" size={16} color="black" />
                ) : route.name == "Favorite" ? (
                  <Ionicons name="heart" size={16} color="black" />
                ) : (
                  <Ionicons name="star" size={16} color="black" />
                );
              },
            })}
          >
            <Tab.Group>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Favorite"
                component={FavScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="ActractiveScreen"
                component={ActractiveScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Tab.Group>
          </Tab.Navigator>
        </NavigationContainer>
      </EventContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
