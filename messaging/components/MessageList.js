import React from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { MessageShape } from '../utils/MessageUtils';
import { Text, Image, TouchableOpacity, FlatList, StyleSheet, View } from 'react-native';


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


    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;
        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    };
   
    renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );
            case 'image':
                return <Image style={styles.image} source={{ uri }} />;
            case 'location':
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.04,
                        }}
                    >
                        <Marker coordinate={coordinate} />
                    </MapView>
                );
            default:
                return null;
        }
    };
   
    render() {
        const { messages } = this.props;
        return (
            <FlatList
                style={styles.container}
                data={messages}
                inverted
                renderItem={this.renderMessageItem}
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
        margin: 2.5,
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
