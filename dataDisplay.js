import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MainPage from './Main'


export default class bleh extends Component {
    constructor(props) {
        super(props);
        this.state = { meals : false };
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
        var meals = MainPage.state.meals;
        return(
            <View style={styles.container}>
                <Text>Breakfast: {meals.breakfast ? "Yes" : "No"}</Text>
                <Text>Lunch: {meals.lunch ? "Yes" : "No"}</Text>
                <Text>MNS: {meals.mns ? "Yes" : "No"}</Text>
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
        fontSize : 50,
        fontFamily : 'sans-serif-thin',
        margin : 40
        
      },
      spacing : {
        padding : 20
      }
});

