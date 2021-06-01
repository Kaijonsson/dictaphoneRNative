import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Play = (data) => {
  const [param, setParam] = useState();
  const [sound, setSound] = useState();

  useEffect(() => {
    setParam(data);
  }, [data]);

  const playSound = async (key) => {
    try {
      const stringifiedAudio = await AsyncStorage.getItem(key.data);
      const parsedAudio = JSON.parse(stringifiedAudio);
      const newUri = parsedAudio._uri;
      const { sound, status } = await Audio.Sound.createAsync({ uri: newUri });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {}
  };
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return <Button title="Play" onPress={() => playSound(param)} />;
};
export default Play;

const styles = StyleSheet.create({});
