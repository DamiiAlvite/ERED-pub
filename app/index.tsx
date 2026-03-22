import { useMemo, useState } from 'react';
import { FlatList, Keyboard, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';

import { Feature, Point } from 'geojson';
import NetworkMap from '../components/map';
import nodesMap from '../assets/data/nodes_map.json';

type NodeProperties = {
  id?: string;
  ID?: string;
  nombre?: string;
  name?: string;
};

type NodeFeature = Feature<Point, NodeProperties>;

const nodeFeatures = (nodesMap.features as NodeFeature[]).filter(
  (feature) => feature.geometry?.type === 'Point' && Array.isArray(feature.geometry.coordinates)
);

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default function Main() {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState<[number, number] | null>(null);

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    if (!normalizedQuery) {
      return [] as NodeFeature[];
    }

    return nodeFeatures.filter((feature) => {
      const properties = feature.properties ?? {};
      const code = normalizeSearch(String(properties.id ?? properties.ID ?? ''));
      const name = normalizeSearch(String(properties.nombre ?? properties.name ?? ''));

      return code.startsWith(normalizedQuery) || name.startsWith(normalizedQuery);
    });
  }, [query]);

  const handleSelectResult = (feature: NodeFeature) => {
    const [longitude, latitude] = feature.geometry.coordinates;
    setSelectedCoordinate([longitude, latitude]);
    setQuery(String(feature.properties?.id ?? feature.properties?.ID ?? feature.properties?.nombre ?? feature.properties?.name ?? ''));
    setIsSearchOpen(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NetworkMap selectedCoordinate={selectedCoordinate} />

      <SafeAreaView style={styles.overlayRoot} pointerEvents="box-none">
        <View style={styles.topLayer} pointerEvents="box-none">
          <Searchbar
            placeholder="Buscar elemento o alimentador"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            style={styles.searchbar}
            elevation={2}
          />

          {isSearchOpen && results.length > 0 && (
            <View style={styles.resultsContainer}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={results}
                keyExtractor={(item, index) => {
                  const id = String(item.properties?.id ?? item.properties?.ID ?? '');
                  const name = String(item.properties?.nombre ?? item.properties?.name ?? '');
                  return `${id}-${name}-${index}`;
                }}
                renderItem={({ item }) => {
                  const id = String(item.properties?.id ?? item.properties?.ID ?? '').trim();
                  const name = String(item.properties?.nombre ?? item.properties?.name ?? '').trim();

                  return (
                    <Pressable style={styles.resultItem} onPress={() => handleSelectResult(item)}>
                      <Text style={styles.resultCode}>{id || 'SIN CODIGO'}</Text>
                      {name ? <Text style={styles.resultName}>{name}</Text> : null}
                    </Pressable>
                  );
                }}
              />
            </View>
          )}
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
  resultsContainer: {
    maxHeight: 280,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  resultItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9d9d9',
    backgroundColor: '#ffffff',
  },
  resultCode: {
    color: '#1d1d1d',
    fontWeight: '600',
    fontSize: 14,
  },
  resultName: {
    color: '#4f4f4f',
    marginTop: 2,
    fontSize: 12,
  },
});