import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading'

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
          <Text>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Sign Up" onPress={this.handleSignUp} />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
