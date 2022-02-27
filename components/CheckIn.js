import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
  ViewBase,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: false,
      goBack: false,
      results: [],
    };
  }

  async componentDidMount() {
    var coverImageVar = res.data.results.map(obj => obj);

    this.setState({
      results: book,
    });
    console.log(this.state.coverImage);
  }

  render() {
    const lenderEmail = AsyncStorage.getItem('lenderEmail');

    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Text></Text>
        <Text></Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, marginTop: 20, textAlign: 'center'}}>
            Return a Book
          </Text>
          <TextInput
            //value={this.state.email}
            placeholder="Search For Books"
            autoCapitalize="none"
            selectionColor="black"
            underlineColor="black"
            underlineColorAndroid="black"
            style={{
              marginTop: 50,
              fontSize: 20,
              width: '75%',
              marginBottom: 25,
            }}
            onChangeText={e => {
              this.setState({search: e});
            }}></TextInput>
          <Button
            //icon="login"
            mode="outlined"
            loading={this.state.loading}
            color="black"
            onPress={() => {
              axios
                .post('https://books2gobackend.herokuapp.com/books/search', {
                  query: this.state.search,
                  lenderEmail: lenderEmail._W,
                })
                .then(res => {
                  console.log(res.data.results.map(obj => obj)),
                    this.setState({
                      results: res.data.results.map(obj => obj),
                    });
                })
                .catch(err => {
                  console.log(err);
                  alert(
                    'Something went wrong. Are you connected to the internet?',
                  );
                });
            }}
            contentStyle={{
              width: 175,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Search
          </Button>

          <View>
            {this.state.results.map(result => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Checked Out', {
                    image: result.cover,
                    title: result.title,
                    author: result.author,
                    id: result._id,
                    checkedOut: result.checkedOut,
                  });
                }}>
                <Image
                  key="bookCover"
                  style={{
                    width: 200,
                    height: 300,
                    marginBottom: 25,
                    borderRadius: 5,
                    marginTop: 25,
                  }}
                  source={{uri: result.cover}}></Image>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default CheckIn;
