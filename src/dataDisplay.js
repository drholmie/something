import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SingleMeal from './singleMeal';
import SingleItem from './singleItem';

export default class dataDisplay extends Component {
    constructor(props) {
        super(props);
        // this.state = { meals : false };
    }

    componentWillMount() {
        // Intructions to execute before mounting
    }

    componentDidMount() {
        // Intructions to execute after mounting
    }

    render() {
        // Return a view of what to render
        var meals = this.props.meals;
        var other = (this.props.other) ? this.props.other : new Object();
        return (
            <View>
                <SingleMeal mealName="Breakfast" mealValue={meals.breakfast} />
                <SingleMeal mealName="Lunch Day 1" mealValue={meals.lunchDay1} />
                <SingleMeal mealName="Snacks" mealValue={meals.snacks} />
                <SingleMeal mealName="Mid-night snacks" mealValue={meals.mns} />
                <SingleItem itemName="Ethernet Cables" qty={other.ethernetCables} />
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
        margin: 20

    },
});

