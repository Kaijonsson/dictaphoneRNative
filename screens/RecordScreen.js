import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import globalStyles from "../style/styles";

const RecordScreen = () => {
  const [recording, setRecording] = useState();

  const storeData = async (value) => {
    let timeStamp = new Date();
    const key = timeStamp.toString();
    const newKey = key.slice(0, 25);
    const stringified = JSON.stringify(value);

    try {
      await AsyncStorage.setItem(newKey, stringified);
    } catch (err) {}
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {}
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      storeData(recording);
      setRecording(undefined);
    } catch (err) {}
  };

  if (recording === undefined) {
    return (
      <View style={styles.startContainer}>
        <Button title={"Start Recording"} onPress={startRecording} />
      </View>
    );
  } else {
    return (
      <View style={styles.stopContainer}>
        <Button title={"Stop Recording!"} onPress={stopRecording} />
      </View>
    );
  }
};
export default RecordScreen;

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    justifyContent: "center",
    padding: globalStyles.paddingMain,
    backgroundColor: globalStyles.mainBackgroundGreen,
  },
  stopContainer: {
    flex: 1,
    justifyContent: "center",
    padding: globalStyles.paddingMain,
    backgroundColor: globalStyles.mainBackgroundGreen,
  },
});
