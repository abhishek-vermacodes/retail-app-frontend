import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Map() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://www.openstreetmap.org' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
