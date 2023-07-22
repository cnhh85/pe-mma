import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { useEventContext } from "../misc/new";

const Detail = ({ route, navigation }) => {
  const { id } = route.params;
  const { newState, likeEvent, dislikeEvent } = useEventContext();

  const item = newState.find((item) => item.id === id);

  function addHandle() {
    likeEvent(item.id);
    ToastAndroid.showWithGravity(
      `New ${item.id} has been add to favorite list!`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
    navigation.navigate("ActractiveFeed");
  }
  function removeHandle() {
    dislikeEvent(item.id);
    ToastAndroid.showWithGravity(
      `New ${item.id} has been removed from favorite list!`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
    ToastAndroid.show("Removed from favorite", ToastAndroid.SHORT);
    navigation.navigate("ActractiveFeed");
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          padding: 20,
          borderRadius: 5,
          backgroundColor: "#fff",
          marginTop: 20,
        }}
      >
        <Image
          source={{ uri: item.img }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 10,
            maxHeight: 300,
          }}
        />
        <ScrollView style={{ marginTop: 30, maxHeight: 700 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>{item.title}</Text>
          <Text style={{ fontWeight: "thin", fontSize: 12 }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
        </ScrollView>
        <Text style={{ fontWeight: "thin", fontSize: 12 }}>
          View: {item.views}
        </Text>
        <Text style={{ fontWeight: "thin", fontSize: 12 }}>
          Actractive: {item.actractive ? "true" : "false"}
        </Text>
        <View style={{marginBottom: 30}}>
          {item.isFavorite ? (
            <TouchableOpacity
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f00",
                borderRadius: 5,
                padding: 10,
                marginTop: 30
              }}
              onPress={removeHandle}
            >
              <Text style={{ color: "#fff" }}>Remove from favorite</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#222",
                borderRadius: 5,
                padding: 10,
                marginTop: 30
              }}
              onPress={addHandle}
            >
              <Text style={{ color: "#fff" }}>Add to favorite</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
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

export default Detail;
