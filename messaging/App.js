import React from 'react';
import { Alert, BackHandler, Image, ImageBackground, TouchableHighlight, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import Toolbar from "./components/Toolbar";
import * as Location from 'expo-location';

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
    isInputFocused: false,
  };
  handlePressToolbarCamera = () => {
    // ...
    };
  handlePressToolbarLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        messages: [createLocationMessage({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }), ...this.state.messages],
      });
    };

  handleChangeFocus = (isFocused) => { 
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state; 
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  renderToolbar() {
    const { isInputFocused } = this.state; 
    return (
        <Toolbar 
          isFocused={isInputFocused} 
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus} 
          onPressCamera={this.handlePressToolbarCamera} 
          onPressLocation={this.handlePressToolbarLocation}
        />
    );
  }

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
        this.setState({ fullscreenImageId: id, isInputFocused: false });
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
      <TouchableHighlight 
        style={styles.fullscreenOverlay} 
        onPress={this.dismissFullscreenImage}
        underlayColor="transparent"
      >
        <Image 
          style={styles.fullscreenImage} 
          source={{ uri }}
          resizeMode="contain"
          />
      </TouchableHighlight>
    );
  };


  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} 
        onPressMessage={this.handlePressMessage} 
      />
      </View>
    );
  }


  render() {
    return (
      <ImageBackground
        source={{uri: "https://r2.community.samsung.com/t5/image/serverpage/image-id/2896028iC6D2468BA4D9B5AA?v=v2"}}
        style={styles.container}
      >
        <View style={styles.container}>
        <Status/>
        {this.renderFullscreenImage()}
        <MessageList
              messages={this.state.messages}
              onPressMessage={this.handlePressMessage}
        />
        {this.renderToolbar()}
        </View>
      </ImageBackground>
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
