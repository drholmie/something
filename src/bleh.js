import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import QRgenerate from './qrGenerate'
import Loading from './Loading'


export default class bleh extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "blank", loading: true };
    }

    componentWillMount() {
        var self = this;
        var db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("participants").doc("name")
            .onSnapshot(function (doc) {
                console.log("MEEEEEEEEEEEEEEEEEEEEE" + doc);
                self.setState({ username: doc.data().uname, loading: false })
            });
    }

    renderNormal() {
        return (
            <View style={styles.container}>
                <Text>Data = {this.state.username}</Text>
                <QRgenerate message={this.state.username} />
            </View>
        );
    }

    renderLoading() {
        return (
            <View>
                <Loading />
            </View>
        );
    }

    render() {
        if (this.state.loading)
            return this.renderLoading();
        else
            return this.renderNormal();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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

