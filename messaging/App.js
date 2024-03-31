import React from 'react';
import { StatusBar, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createTextMessage("I will pass this course"),
      createTextMessage("I will pass this course"),
      createImageMessage('https://picsum.photos/200/300'),
      createTextMessage('Emerging Technologies 3'),
      createTextMessage('CPE026/CPE41S1'),
      createTextMessage('Villareal, Mar Joseph D.'),
      createLocationMessage({
        latitude: 14.6258,
        longitude: 121.0617,
      }),
    ],
  };

  handlePressMessage = () => {};

  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <Status/>
          <StatusBar style="auto" />
        <View style={styles.content}>
          {this.renderMessageList()}
        </View>
        <View style={styles.toolbar}>
          <Text>Toolbar Skeleton</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="rgba(0,0,0,0.5)"
              textAlign="right" // Align text to the right
            />
          </View>
        </View>
        <View style={styles.inputMethodEditor}>
          <Text>Input Method Editor Skeleton</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 8,
    padding: 2.5,
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
  textInputContainer: {
    borderWidth: 1, // Add border width
    borderColor: 'black', // Add border color
    borderRadius: 5, // Add border radius
    backgroundColor: '#f0f0f0',
    flex: 1, // Take remaining space
    marginLeft: 10, // Add some margin to the left
  },
  textInput: {
    fontSize: 16,
    textAlign: "right", // Align text to the right
  },
});
