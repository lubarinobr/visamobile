import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 13,
        fontStyle: 'italic',
    },
    photo: {
        height: 80,
        width: 50,
    },
});

const InfoRow = ({ title, description, icon = 'rowing', navigator }) => (
    <TouchableOpacity style={styles.container} onPress={navigator}>
        <Icon
            name={icon} size={25} />
        {/* <Image source={{ uri: image_url }} style={styles.photo} /> */}
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>

    </TouchableOpacity>
);

export default InfoRow;