import React from 'react'
import { StyleSheet, Alert, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading';
import DataDisplay from './dataDisplay'


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: false, loading: true, meals: null, other: null };
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
                  breakfast: false,
                  lunchDay1: false,
                  lunchDay2: false,
                  mns: false,
                  snacks: false,
                  dinner: false
                },
                other: {
                  ethernetCables: 0
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
              self.setState({ meals: doc.data().meals, other: doc.data().other, loading: false });
            }
          }, function (error) {
            console.log(error);
          });
      }
      else {
        self.props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    if (this.state.loading)
      return <Loading />;
    else {
      var user = this.state.user;
      var meals = this.state.meals;
      var other = this.state.other;
      return (
        <View style={styles.container}>
        <View style={styles.Smallcontainer}>
        <View style = {styles.buttonstyles}>
          <Text style = {styles.textstyles}>
            Hi {user.email}!
          </Text>
          </View>
          <View style = {styles.buttonstyles}>
          <Button
            color="#cd5c5c"
            onPress={
              () => {
                this.props.navigation.navigate('ShowQR');
              }
            }
            title="Show QR Code"
          />
          </View>
          <View>
          <Button
            color="#cd5c5c"
            onPress={
              () => {
                // Alert.alert("Sign Out");
                firebase.auth().signOut().then(function () {
                  Alert.alert("Successfully signed out.");
                }).catch(function (error) {
                  Alert.alert("Error occurred, please try after a while.");
                });
              }
            }
            title="Sign Out"
          />
          </View>
          <Text style = {styles.textstyles}>{'\n'}</Text>
          {/* <Text>Breakfast: {meals.breakfast ? "Yes" : "No"}</Text>
          <Text>Lunch: {meals.lunch ? "Yes" : "No"}</Text>
          <Text>MNS: {meals.mns ? "Yes" : "No"}</Text> */}
          </View>
          <View style={styles.Smallcontainer}>
            <DataDisplay meals={meals} other={other} />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  Smallcontainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textstyles: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'sans-serif-thin',
  },
  buttonstyles: {
    marginVertical: 8
  }
})
