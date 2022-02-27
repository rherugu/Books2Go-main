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
import Book from './Book';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: this.props.route.params.book,
    };
  }
  async componentDidMount() {
    var book = this.props.route.params.book;

    this.setState({
      coverImage: book,
    });
    console.log(this.state.coverImage);
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        style={{
          backgroundColor: 'white',
        }}>
        {this.state.coverImage.map(book => (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Book', {
                image: book.cover,
                title: book.title,
                author: book.author,
                id: book._id,
                checkedOut: book.checkedOut,
              });
            }}>
            <Image
              source={{uri: book.cover}}
              width={250}
              style={{
                marginBottom: 25,
                borderRadius: 5,
                marginTop: 25,
              }}></Image>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Search;
