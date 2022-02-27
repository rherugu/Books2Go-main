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

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lenderEmail: '',
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.image, 'afiasiuhsdiufhsidufhishd');
    console.log(this.props.route.params.checkedOut);
    if (this.props.route.params.checkedOut === true) {
      alert(
        'This book is not available. It has been checked out already. If you are sure it has been checked back in, close the app and retry.',
      );
      this.props.navigation.navigate('Home');
    } else {
      axios
        .get(
          `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
        )
        .then(res => {
          console.log('dsaadsdsa', res.data);
          this.setState({
            lenderEmail: res.data.lenderEmail,
          });
          if (res.data.checkedOut) {
            alert(
              'This book is not available. It has been checked out already. If you are sure it has been checked back in, close the app and retry.',
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
        if (this.props.route.params.checkedOut === true) {
          alert(
            'This book is not available. It has been checked out already. If you are sure it has been checked back in, close the app and retry.',
          );
          this.props.navigation.navigate('Home');
          console.log('bye');
          checkedOutBook = true;
          this.props.navigation.navigate('Home');
        } else if (this.props.route.params.checkedOut === false) {
          await axios
            .get(
              `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
            )
            .then(res => {
              if (res.data.checkedOut) {
                alert(
                  'This book is not available. It has been checked out already. If you are sure it has been checked back in, close the app and retry.',
                );
                console.log('hi');
                checkedOutBook = true;
                this.props.navigation.navigate('Home');
              }
            })
            .catch(err => {
              alert('Error, do you have an internet connection?');
              console.log(err);
            });
        }
        if (checkedOutBook === false) {
          const userId = await AsyncStorage.getItem('userId');
          var quota = false;
          /*await axios
            .get(`https://books2gobackend.herokuapp.com/users/userid/${userId}`)
            .then(res => {
              if (Number(res.data.checkedOutBooks.length) > 5) {
                quota = true;
              }
            })
            .catch(err => {
              alert('Error, do you have an internet connection?');
              console.log(err, 'err internet');
            });*/
          //if (quota === false) {
          axios
            .patch(
              `https://books2gobackend.herokuapp.com/books/id/${this.props.route.params.id}`,
              {
                checkedOut: true,
              },
            )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err, 'smw');
              alert('Something went wrong. Please try again.');
            });
          /*axios
            .patch(`https://books2gobackend.herokuapp.com/users/${userId}`, {
              checkedOutBooks: this.props.route.params.id,
            })
            .then(res => {
              console.log(
                res,
                'ressdfnsdufosjdfosdfosdfosjdfoijsdofjsoidfjsoidjfosidjfoisdjfoisjdoifjsodjfsodjfsdjfosjdfoisj',
              );
              alert(res);
            })
            .catch(err => {
              console.log(err, 'smw');
              alert('Something went wrong. Please try again.');
            });*/
          alert('Success! Book has been checked out.');
          this.props.navigation.navigate('Home');
        } else if (quota) {
          alert(
            'Sorry, you have already reached a maximum quota of checked out books.',
          );
          this.props.navigation.navigate('Home');
        }
      }
      // }
    } catch (error) {}
  };
  render() {
    var url = this.props.route.params.image;
    url = url.replace(/^http:\/\//i, 'https://');
    return (
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: 50,
            backgroundColor: '#ffffff',
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
          <Text>Email to Contact the Lender: </Text>
          <Text>{this.state.lenderEmail}</Text>
          <Text></Text>
          <Text></Text>
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
            Check Out
          </Button>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
    );
  }
}

export default Book;
