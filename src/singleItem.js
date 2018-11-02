import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';



export default class singleMeals extends Component {
    constructor(props) {
        super(props);
        // this.state = { someField: false };
    }

    componentWillMount() {
        // Intructions to execute before mounting
    }

    componentDidMount() {
        // Intructions to execute after mounting
    }

    render() {
        // Return a view of what to render
        var itemName = this.props.itemName;
        var qty = (this.props.qty) ? this.props.qty : 0;
        return (
            <View style={[styles.container, { backgroundColor: qty ? '#14A085' : '#cf6363' }]}>
                <Text style={[styles.textstyles, { color: 'white' }]}> {itemName}: {qty}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        backgroundColor: '#cf6363',
        borderWidth: 0.5,
        borderColor: '#cd5c5c',
        marginVertical: 4,
        marginHorizontal: 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    textstyles: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'sans-serif',
    }
});

