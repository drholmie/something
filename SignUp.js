import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, Image } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading'
import {Icon} from 'react-native'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: null, loading: false };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    var self = this;
    const { email, password } = this.state;
    self.setState({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        self.setState({ loading: false });
        this.props.navigation.navigate('App');
      })
      .catch(error => self.setState({ errorMessage: error.message, loading: false }))
  }

  render() {
    if(this.state.loading)
      return <Loading />;
    else
      return (
        <View style={styles.container}>
          
          <Image source = {{uri : 'http://worldartsme.com/number-sign-clipart.html#gal_post_6312_number-sign-clipart-1.jpg'}}
            style = {
              {
                width : 100,
                height : 100,
                padding : 30
              }
            }></Image>
          <Text style = {styles.textstyles}>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            placeholderTextColor = 'white'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor = 'white'
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button 
           
            title="Sign Up Now" onPress={this.handleSignUp} />
          <Text style = {styles.spacing}>
          </Text>
          <Button
            
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      )
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
})
