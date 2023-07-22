import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  View,
} from "react-native";

import { FavItemCard } from "../components/FavItemCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";

import FavDetail from "./FavDetailScreen";

import { useEventContext } from "../misc/new";

const Stack = createNativeStackNavigator();
export default function MainScreen() {
  const { newState, dislikeAllEvents, numberOfFavorite, dislikeEvent } =
    useEventContext();
  console.log(newState);

  const [favorites, setFavorites] = useState(
    newState.filter((item) => item.isFavorite)
  );

  useEffect(() => {
    setFavorites(newState.filter((item) => item.isFavorite));
  }, [newState]);

  const header = ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name);

    return (
      <MyHeader
        title={title}
        leftButton={
          back ? <MyBackButton onPress={navigation.goBack} /> : undefined
        }
        style={options.headerStyle}
      />
    );
  };
  const FavList = ({ navigation }) => {
    const goDetail = (item) => {
      navigation.push("Detail", { id: item.id });
    };
    const removeItem = (item) => {
      dislikeEvent(item.id);
      ToastAndroid.showWithGravity(
        `${item.name} has been removed from favorite list!`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    };
    return (
      <>
        <SafeAreaView style={styles.container}>
          {numberOfFavorite <= 0 ? (
            <View>
              <Text>
                Favorite list is empty
              </Text>
            </View>
          ) : (
            <ScrollView>
              {favorites.map((item) => {
                return (
                  <FavItemCard
                    name={item.title}
                    image={item.img}
                    view={item.views}
                    onPress={() => goDetail(item)}
                    addFav={() => addFav(item)}
                    isFav={item.isFavorite}
                    key={item.id}
                  />
                );
              })}
            </ScrollView>
          )}
        </SafeAreaView>
      </>
    );
  };
  return (
    <>
      <Stack.Navigator header={header}>
        <Stack.Screen
          name="FavList"
          component={FavList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Detail"
          component={FavDetail}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 64,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
