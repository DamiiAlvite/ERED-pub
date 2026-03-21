
import Mapbox from '@rnmapbox/maps';
import { FeatureCollection, Geometry } from 'geojson';
import { StyleSheet, View } from 'react-native';

import nodesMap from '../assets/data/nodes_map.json';
import connectionMap from '../assets/data/connections_map.json';

const nodesMapTyped = nodesMap as FeatureCollection<Geometry>;
const connectionsMapTyped = connectionMap as FeatureCollection<Geometry>;
const connectionOpacityByZoom = [
  'interpolate',
  ['linear'],
  ['zoom'],
  11, 0,
  12, 0.15,
  13, 0.35,
  14, 0.6,
  15, 0.8,
  16, 1,
] as const;


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
            id="undergroundWire"
            filter={['==', ['get', 'instalacion'], 'SUBTERRANEA']}
            style={{
              lineColor: '#001aff',
              lineWidth: 3,
              lineOpacity: connectionOpacityByZoom,
            }}
          />

          <Mapbox.LineLayer
            id="aerialWire"
            filter={['==', ['get', 'instalacion'], 'AEREA']}
            style={{
              lineColor: '#001aff',
              lineWidth: 2,
              lineOpacity: connectionOpacityByZoom,
              lineDasharray: [3, 3],
            }}
          />
        </Mapbox.ShapeSource>

        <Mapbox.ShapeSource id="nodesSource" shape={nodesMapTyped}>
          <Mapbox.SymbolLayer
            id="nodesLayer"
            style={{
              textField: [
                'format',
                [
                  'match',
                  ['get', 'tipo'],
                  'CAMARA', '●',
                  'CAMARA_ESPECIAL', '●',
                  'CUCHILLA', '◆',
                  'ARRANQUE', '◆',
                  'BAJO_CARGA', '◆',
                  'PLATAFORMA', '▲',
                  'RECONECTADOR', '◆',
                  'SUBESTACION', '■',
                  'A'
                ],
                { 'font-scale': 1.0 },

                [
                  'case',
                  [
                    '!=',
                    [
                      'case',
                      ['!=', ['coalesce', ['to-string', ['get', 'id']], ['to-string', ['get', 'ID']], ''], ''],
                      [
                        'concat',
                        ['coalesce', ['to-string', ['get', 'id']], ['to-string', ['get', 'ID']], ''],
                        [
                          'case',
                          ['!=', ['coalesce', ['get', 'nombre'], ['get', 'name'], ''], ''],
                          ['concat', '\n', ['coalesce', ['get', 'nombre'], ['get', 'name']]],
                          ''
                        ]
                      ],
                      ['coalesce', ['get', 'nombre'], ['get', 'name'], '']
                    ],
                    ''
                  ],
                  [
                    'concat',
                    '\n',
                    [
                      'case',
                      ['!=', ['coalesce', ['to-string', ['get', 'id']], ['to-string', ['get', 'ID']], ''], ''],
                      [
                        'concat',
                        ['coalesce', ['to-string', ['get', 'id']], ['to-string', ['get', 'ID']], ''],
                        [
                          'case',
                          ['!=', ['coalesce', ['get', 'nombre'], ['get', 'name'], ''], ''],
                          ['concat', '\n', ['coalesce', ['get', 'nombre'], ['get', 'name']]],
                          ''
                        ]
                      ],
                      ['coalesce', ['get', 'nombre'], ['get', 'name'], '']
                    ]
                  ],
                  ''
                ],
                { 'font-scale': 0.2 }
              ],

              textColor: [
                'match',
                ['get', 'tipo'],
                'CAMARA', '#0066ff',
                'CAMARA_ESPECIAL', '#0066ff',
                'PLATAFORMA', '#0066ff',
                'CUCHILLA', '#28A745',
                'ARRANQUE', '#28A745',
                'BAJO_CARGA', '#FFA500',
                'RECONECTADOR', '#FFA500',
                'SUBESTACION', '#343A40',
                '#00c954'
              ],

              textSize: [
                'interpolate',
                ['linear'],
                ['zoom'],
                13, 22,
                16, 70,
              ],
              textHaloColor: '#FFFFFF',
              textHaloWidth: 1,
              textAllowOverlap: true,
              textIgnorePlacement: true,
              textLineHeight: 1,
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