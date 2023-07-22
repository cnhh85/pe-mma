import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ItemCard = (props) => {
  const styles = StyleSheet.create({
    container: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 0.5,
      width: "100%",
      padding: 5,
      borderRadius: 10,
      backgroundColor: "#ffffff",
      marginTop: 5,
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <SafeAreaView style={{ maxHeight: 250 }}>
        <Image
          source={{ uri: props.image }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            maxHeight: 250,
            borderRadius: 10,
          }}
        />
      </SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 30,
        }}
      >
        <View style={{ maxWidth: "80%" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{props.name}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>View: {props.view}</Text>
        </View>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={props.addFav}
        >
          <Text >
            {props.isFav ? (
              <Ionicons name="trash" size={28} color="red" />
            ) : (
              <Ionicons name="heart" size={28} color="pink" />
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
