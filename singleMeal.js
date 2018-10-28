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

    componentDidMount()
    {
        // Intructions to execute after mounting
    }

    render() {
        // Return a view of what to render
        var singlemeal = this.props.singlemeal;
        return(
            <View style={styles.container}>
                
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

