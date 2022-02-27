import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage;
import {mdiArrowLeftThin} from '@mdi/js';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      goBack: false,
      fname: '',
      lname: '',
      address: '',
      phone_number: '',
    };
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Text></Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, marginTop: 20, textAlign: 'center'}}>
            Register
          </Text>
          <TextInput
            value={this.state.fname}
            placeholder="First Name"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 50,
              fontSize: 20,
              width: '75%',
              height: 50,
            }}
            onChangeText={e => {
              this.setState({fname: e});
            }}></TextInput>
          <TextInput
            value={this.state.lname}
            placeholder="Last Name"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 30,
              fontSize: 20,
              width: '75%',
              height: 50,
            }}
            onChangeText={e => {
              this.setState({lname: e});
            }}></TextInput>
          <TextInput
            value={this.state.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 30,
              fontSize: 20,
              width: '75%',
              height: 50,
            }}
            onChangeText={e => {
              this.setState({email: e});
            }}></TextInput>
          <TextInput
            value={this.state.password}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 30,
              fontSize: 20,
              width: '75%',
              height: 50,
            }}
            onChangeText={e => {
              this.setState({password: e});
            }}></TextInput>
          <TextInput
            value={this.state.address}
            placeholder="Address"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 30,
              fontSize: 20,
              width: '75%',
              height: 50,
            }}
            onChangeText={e => {
              this.setState({address: e});
            }}></TextInput>
          <TextInput
            value={this.state.phone_number}
            placeholder="Phone Number"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 30,
              fontSize: 20,
              width: '75%',
              marginBottom: 50,
              height: 50,
            }}
            onChangeText={e => {
              this.setState({phone_number: e});
            }}></TextInput>
          <Button
            icon="login"
            mode="outlined"
            loading={this.state.loading}
            onPress={async () => {
              this.setState({
                loading: true,
              });
              const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (re.test(String(this.state.email).toLowerCase())) {
                await axios
                  .post('https://books2gobackend.herokuapp.com/register', {
                    fname: this.state.fname,
                    lname: this.state.lname,
                    email: this.state.email,
                    password: this.state.password,
                    address: this.state.address,
                    phone_number: this.state.phone_number,
                  })
                  .then(async res => {
                    console.log('ssa');
                    if (
                      res.data ===
                      'Email already exists. Please choose a different email.'
                    ) {
                      alert(
                        'Email already exists. Please choose a different email.',
                      );
                    }
                    axios
                      .post('https://books2gobackend.herokuapp.com/login', {
                        email: this.state.email,
                        password: this.state.password,
                      })
                      .then(async res => {
                        console.log(res);
                        await AsyncStorage.setItem(
                          'token',
                          res.headers.authtoken,
                        );
                        console.log(AsyncStorage.getItem('token'));
                        alert('Successfully logged in!');
                        this.setState({
                          loading: false,
                        });
                        this.props.navigation.navigate('Home');
                      })
                      .catch(err => {
                        console.error(err);
                        this.setState({
                          loading: false,
                        });

                        const password = this.state.password;
                        if (password.length < 6) {
                          alert('Password must be at least 6 characters long.');
                        } else if (
                          res.data ===
                          'Email already exists. Please choose a different email.'
                        ) {
                          alert(
                            'Email already exists. Please choose a different email.',
                          );
                        } else {
                          alert('Something went wrong.');
                        }
                        console.log(res);
                      });
                  })
                  .catch(err => {
                    console.error(err);
                    this.setState({
                      loading: false,
                    });
                    alert('Something went wrong!');
                  });
              } else {
                alert('Email is not valid.');
                this.setState({
                  loading: false,
                });
              }
            }}
            color="black"
            contentStyle={{
              width: 175,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Sign up
          </Button>
          <Text></Text>
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
            color="#cb997e"
            contentStyle={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Go back
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default SignUp;
