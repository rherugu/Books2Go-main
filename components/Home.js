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
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      coverImage2: [],
      coverImage3: [],
      lineDisplay: 'flex',
      lineDisplay2: 'none',
      coverImage: [],
    };
  }
  async componentDidMount() {
    var errorInternet = 0;
    axios
      .get('https://books2gobackend.herokuapp.com/books/pagination', {
        headers: {
          page: 0,
        },
      })
      .then(res => {
        this.setState({
          coverImage: res.data,
        });
        console.log(this.state.coverImage);
      })
      .catch(err => {
        errorInternet = 1;
        console.error(err);
      });
    axios
      .get('https://books2gobackend.herokuapp.com/books/pagination', {
        headers: {
          page: 1,
        },
      })
      .then(res => {
        this.setState({
          coverImage2: res.data,
        });
        console.log(this.state.coverImage2);
      })
      .catch(err => {
        errorInternet = 1;
        console.error(err);
      });
    axios
      .get('https://books2gobackend.herokuapp.com/books/pagination', {
        headers: {
          page: 2,
        },
      })
      .then(res => {
        this.setState({
          coverImage3: res.data,
        });
        console.log(this.state.coverImage3);
      })
      .catch(err => {
        errorInternet = 1;
        console.error(err);
      });

    if (errorInternet === 1) {
      alert('Something went wrong. Are you connected to the internet?');
    }
  }
  _renderItem = ({item, index}) => {
    console.log(item);
    var url = item.cover;
    url = url.replace(/^http:\/\//i, 'https://');
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
        }}
        onPress={async () => {
          const tokenCheck = await AsyncStorage.getItem('token');
          if (
            tokenCheck === undefined ||
            tokenCheck === null ||
            tokenCheck === ''
          ) {
            alert('You must be logged in to check out a book.');
            this.props.navigation.navigate('Login');
          } else {
            this.props.navigation.navigate('Book', {
              image: item.cover,
              title: item.title,
              author: item.author,
              id: item._id,
              checkedOut: item.checkedOut,
            });
          }
        }}>
        <Image
          source={{uri: url}}
          style={{
            borderRadius: 25,
            marginTop: -200,
            marginBottom: 50,
            flex: 1,
            width: 'auto',
            height: 'auto',
            transform: [{scale: 0.75}],
          }}></Image>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {/* <Header
          title="Diversity Library"
          navigation={this.props.navigation}></Header> */}
        <Text></Text>
        <Text></Text>
        <View
          style={styles.scrollView}
          contentContainerStyle={{justifyContent: 'center'}}>
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={this.state.coverImage}
            itemHeight={450}
            sliderHeight={viewportHeight - 100}
            itemWidth={100}
            vertical
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({activeIndex: index})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 1,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  menutext: {
    marginLeft: 75,
    marginRight: 75,
  },
});

export default HomeScreen;
