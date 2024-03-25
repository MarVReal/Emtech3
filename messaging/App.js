import {StatusBar} from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Status from './components/Status';

export default function App(){
  return(
    <View style={styles.container}>
      <Status/>
      <StatusBar style="auto"/>
      <Text style={styles.content}>MessageList</Text>
      <Text style={styles.inputMethodEditor}>Input Method Editor</Text>
      <Text style={styles.toolbar}>Toolbar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
  },
  inputMethodEditor:{
    flex: 1,
    backgroundColor:'white'
  },
  toolbar:{
    flex: 1,
    borderTopColor: 'red',
    backgroundColor:'white'
  },
});