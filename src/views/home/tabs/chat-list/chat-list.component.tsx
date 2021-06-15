import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex:1
  },
  photo_user: {
    width: 60,
    height: 60,
    borderRadius:50,
  }
});

export function ChatListScreen() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
              <Image
        style={styles.photo_user}
        source={{
          uri: 'https://images-na.ssl-images-amazon.com/images/I/41m6OMVqEOL._SY600_.jpg',
        }}
      />
              </View>
      <View style={{ flex: 1, marginLeft: 8}}>
          <Text>Nome</Text>
          <Text>subtitulo</Text>
      </View>
      </View>
      </View>
    );
  }