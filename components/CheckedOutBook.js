import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class CheckedOutBook extends Component {
  componentDidMount() {
    console.log(this.props.route.params.image, 'afiasiuhsdiufhsidufhishd');
    console.log(this.props.route.params.checkedOut);
    if (this.props.route.params.checkedOut === false) {
      alert("You can't check this book back in: it hasn't been checked out!");
      this.props.navigation.navigate('Home');
    } else {
      axios
        .get(
          `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
        )
        .then(res => {
          console.log('dsaadsdsa', res.data);
          if (
            res.data.checkedOut === false ||
            res.data.checkedOut === undefined
          ) {
            alert(
              "You can't check this book back in: it hasn't been checked out!",
            );
            this.props.navigation.navigate('Home');
          }
        })
        .catch(err => {
          alert('Error, do you have an internet connection?');
          console.log(err);
        });
    }
  }
  onPress = async () => {
    var checkedOutBook = false;
    const tokenAsync = await AsyncStorage.getItem('token');
    console.log(tokenAsync, 'ffdsffsd');
    try {
      if (
        tokenAsync === undefined ||
        tokenAsync === null ||
        tokenAsync === ''
      ) {
        this.props.navigation.navigate('Login', {bookLogin: true});
      } else {
        if (this.props.route.params.checkedOut === false) {
          alert(
            "This book cannot be checked back in: it hasn't been checked out!",
          );
          this.props.navigation.navigate('Home');
          console.log('bye');
          checkedOutBook = false;
          this.props.navigation.navigate('Home');
        } else if (this.props.route.params.checkedOut === true) {
          await axios
            .get(
              `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
            )
            .then(res => {
              console.log(res.data.checkedOut);
              if (
                res.data.checkedOut === undefined ||
                res.data.checkedOut === false
              ) {
                alert(
                  "This book cannot be checked back in: it hasn't been checked out!",
                );
                console.log('hi');
                checkedOutBook = false;
                this.props.navigation.navigate('Home');
              }
            })
            .catch(err => {
              alert('Error, do you have an internet connection?');
              console.log(err);
            });
        }
        console.log('hi');
        const userId = await AsyncStorage.getItem('userId');
        var quota = false;

        await axios
          .patch(
            `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
            {
              checkedOut: false,
            },
          )
          .then(res => {
            console.log(res, 'resres');
          })
          .catch(err => {
            console.log(err, 'smw');
            alert('Something went wrong. Please try again.');
          });

        alert('Success! Book has been checked back in.');
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    var url = this.props.route.params.image;
    url = url.replace(/^http:\/\//i, 'https://');
    return (
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: 50,
          }}>
          <Image
            width={Dimensions.get('window').width / 1.5}
            style={{
              borderRadius: 5,
            }}
            source={{
              uri: url,
            }}></Image>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 50,
              fontSize: 25,
              width: '50%',
              textAlign: 'center',
            }}>
            {this.props.route.params.title}
          </Text>

          <Text
            style={{
              marginTop: 15,
              marginBottom: 50,
              fontSize: 18,
              width: '50%',
              textAlign: 'center',
            }}>
            {this.props.route.params.author}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Button
            icon="arrow-left-bold"
            mode="filled"
            color="black"
            style={{
              width: 176,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
            onPress={this.onPress}>
            Check Back In
          </Button>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
    );
  }
}

export default CheckedOutBook;
