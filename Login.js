import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert,Image } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: null, loading: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    var self = this;
    const { email, password } = self.state;
    self.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        self.setState({ loading: false});
        self.props.navigation.navigate('App');
      })
      .catch(error => {
        self.setState({ errorMessage: error.message, email: '', password: '', loading: false });
      })
  }

  render() {
    if (this.state.loading)
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
          <Text style = {styles.textstyles}>Login</Text>
          {this.state.errorMessage &&
            <Text style={styles.textstyles}>
              {this.state.errorMessage}
            </Text>}
            
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor = 'white'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor = 'white'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Login here" onPress={this.handleLogin} />
          <Text style = {styles.spacing}></Text>
          <Button
            title="Don't have an account? Sign Up Now"
            onPress={() => this.props.navigation.navigate('SignUp')}
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
