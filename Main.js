import React from 'react'
import { StyleSheet, Alert, Button, Text, View } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading';
import DataDisplay from './dataDisplay';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: false, loading: true, meals: null };
  }

  // static navigationOption = {
  //   title: '#CODE 2K18',
  //   headerStyle : {
  //     backgroundColor : "#000"
  //   },
  //   headerTintColor : 'blue',
  //   headerTitleStyle : {
  //     fontFamily : 'sans-serif-thin'
  //   }
  // };

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
      return (
        <View style={styles.container}>
          <Text style = {styles.textstyles}>
            Hi {user.email}!
          </Text>
          <Button
            onPress={
              () => {
                this.props.navigation.navigate('ShowQR');
              }
            }
            title="Show QR Code here"
          />
          <Text style = {styles.spacing}></Text>
          <Button
            onPress={
              () => {
                // Alert.alert("Sign Out");
                firebase.auth().signOut().then(function() {
                Alert.alert("Successfully signed out.");
                }).catch(function(error) {
                Alert.alert("Error occurred, please try after a while.");
                });
              }
            }
              title="Sign Out here"
            />
            <Text style = {styles.spacing}></Text>
            <DataDisplay meals= {this.state.meals}/>
            
        </View>
      )
    }
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
    margin : 40
    
  },
  spacing : {
    padding : 20
  }
})
