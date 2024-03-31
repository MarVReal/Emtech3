import { Constants, Animated } from 'react-native';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {
    state = {
        isConnected: false,
        notificationOpacity: new Animated.Value(0), // Initial opacity for notification
        notificationText: '',
        notificationColor: 'green',
    };

    componentDidMount() {
        this.getConnectionInfo();
        this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getConnectionInfo = async () => {
      const state = await NetInfo.fetch();
      const isConnected = state.isConnected;
      this.setState({ isConnected });
    }

    handleConnectivityChange = state => {
        const isConnected = state.isConnected;
        this.setState({ isConnected });
        if (isConnected) {
            this.showNotification('Connected', 'green', 1000); // Show notification if connection is restored
        } else {
            this.showNotification('Not Connected', 'red', 3000); // Show notification if there is no connection
        }
    }

    showNotification = (text, color, duration) => {
        this.setState({ notificationText: text, notificationColor: color });
        Animated.timing(this.state.notificationOpacity, {
            toValue: 1, // Fade in notification
            duration: 1000, // 1 second duration for fading in
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(this.state.notificationOpacity, {
                toValue: 0, // Fade out notification
                duration: 2000, // 1 second duration for fading out
                useNativeDriver: true,
            }).start();
        }, 3000);
    };

    render() {
        const { isConnected } = this.state;
        const { notificationOpacity } = this.state;
        const { notificationText } = this.state;
        const { notificationColor } = this.state;

        const messageContainer = (
          <View style={styles.notificationContainer}>
            <StatusBar
                backgroundColor={isConnected ? 'transparent' : 'red'}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={true}
            />
            <Animated.View style={[styles.notification, { opacity: notificationOpacity, backgroundColor: notificationColor, zIndex: 10 }]}>
                <View style={styles.bubblecontainer} backgroundColor={isConnected ? 'green' : 'red'}>
                  <Text style={styles.bubbletext}>{notificationText}</Text>
                </View>
            </Animated.View>
          </View>
        );

        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.status, { backgroundColor: isConnected ? 'green' : 'red' }]}>
                    {messageContainer}
                </View>
            );
        }
        return messageContainer;
    }
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
    status: {
        height: statusHeight,
    },
    notificationContainer: {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    notification: {
      flex:1,
      position: 'absolute',
      top: 0, // Adjust as needed
      left:0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bubbletext:{
        color: 'white',
        fontSize: 12,
    },
    bubblecontainer:{
      flex: 1,
      borderRadius: 10,
      top: statusHeight + 50, 
      alignItems: 'center',
      padding: 7.5,
    }
});