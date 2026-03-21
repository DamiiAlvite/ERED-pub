import { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Modal, Portal, Searchbar, Text } from 'react-native-paper';
import NetworkMap from '../components/map';

export default function Main() {
  const [query, setQuery] = useState('');
  const [isLayersModalVisible, setIsLayersModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NetworkMap />

      <SafeAreaView style={styles.overlayRoot} pointerEvents="box-none">
        <View style={styles.topLayer} pointerEvents="box-none">
          <Searchbar
            placeholder="Buscar elemento o alimentador"
            value={query}
            onChangeText={setQuery}
            style={styles.searchbar}
            elevation={2}
          />
        </View>


      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlayRoot: {
    ...StyleSheet.absoluteFillObject,
  },
  topLayer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchbar: {
    borderRadius: 12,
  },
});