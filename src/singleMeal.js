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
        var mealName = this.props.mealName;
        var mealValue = this.props.mealValue;
        return (
            <View>
                <Text style={styles.textstyles}> {mealName}: {mealValue ? "Yes" : "No"}</Text>
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

