import React from 'react'
import { StyleSheet, Platform, Button, Text, View, Image, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading';
import DataDisplay from './dataDisplay'


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: false, loading: true, meals: null, other: null, teamid: null };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity style={styles.touchable}
          onPress={() => {
            navigation.navigate('ShowQR');
          }}>
          <Image
            source={require('./../assets/qrButton.png')}
          />
        </TouchableOpacity>
      ),
    };
  };

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
                details: {
                  name: user.email,
                  teamid: ""
                },
                meals: {
                  breakfast: false,
                  lunchDay1: false,
                  lunchDay2: false,
                  mns: false,
                  snacks: false,
                  dinner: false
                },
                other: {
                  cablesGivenBack: false,
                  ethernetCables: false,
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
              self.setState({ meals: doc.data().meals, other: doc.data().other, teamid: doc.data().details.teamid, loading: false });
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
    else if (!this.state.teamid) {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Text style={{ fontSize: 30, textAlign: "center", paddingHorizontal: 12, fontFamily: 'sans-serif-thin' }}>Sorry, you are not registered to a team yet.</Text>
        </View>
      )
    }
    else {
      var user = this.state.user;
      var meals = this.state.meals;
      var other = this.state.other;
      return (
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.buttonstyle, { paddingHorizontal: 8, paddingVertical: 8 }]}>
              <Text style={styles.textstyles}>
                Hi {user.email}!
              </Text>
            </View>
            <View style={{
              borderWidth: 0.5,
              borderColor: 'black',
              margin: 10,
            }} />
            {/* <View>
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
              /> */}
          </View >
          <View style={styles.Smallcontainer}>
            <DataDisplay meals={meals} other={other} />
          </View>
          {Platform.OS === 'ios' &&
            <View style={[styles.buttonstyles, { alignItems: 'center' }]}>
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
          }
        </View >
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  Smallcontainer: {
    flex: 1,
  },
  textstyles: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
  },
  buttonstyles: {
    marginVertical: 8
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {

  },
  touchable: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
