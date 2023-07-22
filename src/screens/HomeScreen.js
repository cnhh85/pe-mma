import { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
  Pressable,
  Text,
} from "react-native";

import { useEventContext } from "../misc/new";
import { ItemCard } from "../components/ItemCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import Detail from "./DetailScreen";
const Stack = createNativeStackNavigator();

export default function MainScreen() {
  const { newState, likeEvent, dislikeEvent } = useEventContext();

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
  const Feed = ({ navigation }) => {
    const goDetail = (item) => {
      navigation.navigate("Detail", { id: item.id });
    };
    const addFav = (item) => {
      if (item.isFavorite) {
        dislikeEvent(item.id);
        ToastAndroid.showWithGravity(
          `New ${item.id} has been removed from favorite list!`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        likeEvent(item.id);
        ToastAndroid.showWithGravity(
          `New ${item.id} has been add to favorite list!`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
    };
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {newState
              .filter((item) => item.status)
              .map((item) => {
                console.log(item.views);
                return (
                  <ItemCard
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
        </SafeAreaView>
      </>
    );
  };
  return (
    <>
      <Stack.Navigator header={header}>
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
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
