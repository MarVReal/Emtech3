import {StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Status from './components/Status';

export default function App(){
  return(
    <View style={styles.container}>
      <Status/>
      <StatusBar style="auto"/>
      <Text style={styles.content}>MessageList</Text>
      <Text style={styles.toolbar}>Toolbar</Text>
      <Text style={styles.inputMethodEditor}>Input Method Editor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
  content: {
    flex: 8,
    padding: 2.5,
    marginTop: 50,
  },
  inputMethodEditor: {
    flex: 3,
    backgroundColor: 'grey',
  },
  toolbar: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between", // Align items with space between
    alignItems: "center", // Align items vertically centered
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
});