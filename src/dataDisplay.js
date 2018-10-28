import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SingleMeal from './singleMeal';

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
        return (
            <View>
                <SingleMeal mealName="Breakfast" mealValue={meals.breakfast} />
                <SingleMeal mealName="Lunch" mealValue={meals.lunch} />
                <SingleMeal mealName="Mid-night snacks" mealValue={meals.mns} />
                {/* <Text style = {styles.textstyles}>Breakfast: {meals.breakfast ? "Yes" : "No"}</Text> */}
                {/* <Text style = {styles.textstyles}>Lunch: {meals.lunch ? "Yes" : "No"}</Text>
                <Text style = {styles.textstyles}>MNS: {meals.mns ? "Yes" : "No"}</Text> */}
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

