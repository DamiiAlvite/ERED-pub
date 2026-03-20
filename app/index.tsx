import { StatusBar, StyleSheet, View } from 'react-native';
import NetworkMap from '../components/map';

export default function main() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NetworkMap/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});