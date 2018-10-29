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
        var qty = this.props.qty;
        return (
            <View>
                <Text style={styles.textstyles}> {itemName}: {qty ? qty : 0}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textstyles: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'sans-serif-thin',
    }
});

