
import Mapbox from '@rnmapbox/maps';
import { FeatureCollection, Geometry } from 'geojson';
import { StyleSheet, View } from 'react-native';

import nodesMap from '../assets/data/nodes_map.json';
import connectionMap from '../assets/data/connections_map.json';

const nodesMapTyped = nodesMap as FeatureCollection<Geometry>;
const connectionsMapTyped = connectionMap as FeatureCollection<Geometry>;

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '');

export default function NetworkMap() {
  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map}>
        
        <Mapbox.Camera
          zoomLevel={13}
          centerCoordinate={[-58.2800, -34.7150]} 
          animationMode="flyTo"
          animationDuration={2000}
        />

        <Mapbox.ShapeSource id="connectionSource" shape={connectionsMapTyped}>
          <Mapbox.LineLayer
            id="connectoionLayer"
            style={{
              lineColor: '#FF5733',
              lineWidth: 3,
              lineOpacity: 0.8,
            }}
          />
        </Mapbox.ShapeSource>

        <Mapbox.ShapeSource id="nodesSource" shape={nodesMapTyped}>
          <Mapbox.CircleLayer
            id="nodesLayer"
            style={{
              circleRadius: 5,
              circleColor: '#0052CC',
              circleStrokeWidth: 2,
              circleStrokeColor: '#FFFFFF', 
            }}
          />
        </Mapbox.ShapeSource>

      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});