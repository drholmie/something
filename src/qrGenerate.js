"use strict";

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRgenerate extends Component{
    
    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value= {this.props.message}
                    size={200}
                    bgColor='purple'
                    fgColor='white' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 210,
        width: 210,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
