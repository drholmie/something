import React from 'react'
import { StyleSheet, Alert, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: false, loading: true, meals: null };
  }

  componentDidMount() {
    var self = this;
    var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.setState({ user });

        //Adding a listener
        db.settings({
          timestampsInSnapshots: true
        });
        db.collection("participants").doc(user.uid)
          .onSnapshot(function (doc) {
            if (!doc.data()) {
              db.collection("participants").doc(user.uid).set({
                meals: {
                  lunch: false,
                  dinner: false,
                  mns: false
                }
              })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
            }
            else {
              self.setState({ meals: doc.data().meals, loading: false });
            }
          }, function (error) {
            console.log(error);
          });
      }
      else {
        self.props.navigation.navigate('Auth'); s
      }
    });
  }

  render() {
    if (this.state.loading)
      return <Loading />;
    else {
      console.log(this.state.meals);
      var user = this.state.user;
      var meals = this.state.meals;
      return (
        <View style={styles.container}>
          <Text>
            Hi {user.email}!
          </Text>
          <Button
            onPress={
              () => {
                this.props.navigation.navigate('ShowQR');
              }
            }
            title="Show QR Code"
          />
          <Text>Breakfast: {meals.breakfast ? "Yes" : "No"}</Text>
          <Text>Lunch: {meals.lunch ? "Yes" : "No"}</Text>
          <Text>MNS: {meals.mns ? "Yes" : "No"}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})