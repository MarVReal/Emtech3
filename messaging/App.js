import React from 'react';
import { StatusBar, Alert, BackHandler, Image, TouchableHighlight, TextInput } from 'react-native';
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
    fullscreenImageId: null,
  };

 UNSAFE_componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true; // Tell React Native that the back press is handled
      }
      return false; // Let the default back button behavior happen
    });
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }


  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        this.handleDeleteMessage(id);
        break;
      case 'image':
        this.setState({ fullscreenImageId: id });
        break;
      default:
        break;
    }
  };


  handleDeleteMessage = (id) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.deleteMessage(id) },
      ],
      { cancelable: true }
    );
  };


  deleteMessage = (id) => {
    this.setState(prevState => ({
      messages: prevState.messages.filter(message => message.id !== id)
    }));
  };


  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };


  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;
    const image = messages.find(message => message.id === fullscreenImageId);
    if (!image) return null;
    const { uri } = image;
    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };


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
      {this.renderFullscreenImage()}
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
    fullscreenOverlay: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
