import React from "react";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import PlayButton from "./playScreen/Play";

const RecordingsList = () => {
  const [recordings, setRecordings] = React.useState();

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      const value = await AsyncStorage.getAllKeys();
      setRecordings(value);
    } catch (e) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      const GetData = async () => {
        const value = await AsyncStorage.getAllKeys();
        setRecordings(value);
      };
      GetData();
    }, [])
  );

  if (recordings !== undefined) {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={styles.button} key={item}>
          <Text style={styles.text}>{item}</Text>
          <View style={styles.buttonGrp}>
            <PlayButton data={item} />
            <Button onPress={() => removeValue(item)} title="Delete"></Button>
          </View>
        </TouchableOpacity>
      );
    };
    const ItemSeparator = () => {
      return (
        <View
          style={{
            height: 2,
            backgroundColor: "gray",
          }}
        />
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.topSep} />
        <Text style={styles.headerText}>Records</Text>
        <View style={styles.separator} />
        <FlatList
          data={recordings}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={ItemSeparator}
          extraData={recordings}
        />
        <View style={styles.bottomSeparator} />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.text}>No Audio files in store</Text>
    </View>
  );
};

export default RecordingsList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "rgb(39, 13, 7)",
    width: "80%",
  },
  text: {
    color: "white",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
  },
  buttonGrp: {
    flexDirection: "row",
  },
  separator: {
    height: 5,
    backgroundColor: "gray",
  },
  bottomSeparator: {
    height: "10%",
    backgroundColor: "#rgb(7, 33, 39)",
  },
  topSep: {
    height: "10%",
    backgroundColor: "#rgb(7, 33, 39)",
  },
});
