import React from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { MessageShape } from '../utils/MessageUtils';
import { Text, Image, TouchableHighlight, FlatList, StyleSheet, View } from 'react-native';


const keyExtractor = item => item.id.toString();
export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
    };


    static defaultProps = {
        onPressMessage: () => {},
    };


    // ...


renderMessageContent = ({ item }) => {
        const { onPressMessage } = this.props;

        switch (item.type) {
            case 'text': return(
                <View style={styles.messageRow}>
                  <TouchableHighlight onPress={() => onPressMessage(item)}>
                    <View style={styles.messageBubble}> 
                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              );

            case 'image':
                return (
                    <View style={styles.messageRow}>
                        <TouchableHighlight onPress={() => onPressMessage(item)}>
                            <Image style={styles.image} source={{ uri: item.uri }}/>
                        </TouchableHighlight>
                    </View>
                
                );
            
            case 'location':
                if (item.coordinate){
                    return(
                        <View style={styles.messageRow}>
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        ...item.coordinate,
                                        latitudeDelta: 0.08,
                                        longitudeDelta: 0.04,
                                    }}
                                >
                                    <Marker coordinate={item.coordinate}/>
                                </MapView>
                            </View>
                        </View>
                    );
                } else {
                    return <Text style={styles.locationText}>Location data is missing</Text>;
                }

            default:
                return null;
        }
    }
   
    render() {
        const { messages } = this.props;
        return (
            <FlatList
                style={styles.container}
                data={messages}
                inverted
                renderItem={this.renderMessageContent}
                keyExtractor={keyExtractor}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        overflow: 'visible', // Prevents clipping on resize!
        marginTop: 1,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 3,
    },
    messageBubble: {
        backgroundColor: '#1e90ff',
        padding: 7.5,
        paddingHorizontal: 7,
        borderRadius: 15,
    },
    map: {
        width: 200,
        height: 200,
      },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontSize: 14,
    }
});
