import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
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
          <Text>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Login" onPress={this.handleLogin} />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
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
