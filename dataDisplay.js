import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SingleMeals from './singleMeal';

export default class dataDisplay extends Component {
    constructor(props) {
        super(props);
        // this.state = { meals : false };
    }

    componentWillMount() {
        // Intructions to execute before mounting
    }

    componentDidMount()
    {
        // Intructions to execute after mounting
    }

    render() {
        // Return a view of what to render
        var meals = this.props.meals;
        return(
            <View style={styles.container}>
                <Text style = {styles.textstyles}>Breakfast: {meals.breakfast ? "Yes" : "No"}</Text>
                <SingleMeals s1 = {this.state.meals.breakfast}/>   
                <Text style = {styles.textstyles}>Lunch: {meals.lunch ? "Yes" : "No"}</Text>
                <SingleMeals s1 = {this.state.meals.lunch}/>
                <Text style = {styles.textstyles}>MNS: {meals.mns ? "Yes" : "No"}</Text>
                <SingleMeals s1 = {this.state.meals.mns}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    
      },
      textInput: {
        height: 40,
        width: '90%',
        color : 'white',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        margin : 30,
        fontFamily : 'sans-serif-thin'
      },
      textstyles: {
        color : 'white',
        fontSize : 30,
        fontFamily : 'sans-serif-thin',
        margin : 20
        
      },
      spacing : {
        padding : 20
      }
});

