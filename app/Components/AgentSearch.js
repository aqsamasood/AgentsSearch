import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, NetInfo, Image } from 'react-native';
import SearchResult from './SearchResult';

const homeImage = require('../Resources/home-icon.png');
const yelp_search = require('../api/yelp_search');
const Texts = {
  description: 'Search for real estate agents by city or country or pincode or lat, long.',
  placeholderText: 'Enter lat, long or city or country.',
  noInternetError: 'No internet connection',
}

class Search extends Component {
  state = {
    searchString: '',
    isConnected: null,
    position: 'unknown',
  };

  componentDidMount() {
    //Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        this._handleUserCurrentLocation()
      },
      (error) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    //add event listener for checking internet availability
     NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };

  //API call to search agents
  _searchAgents() {
    let nav = this.props.navigator
    let state = this.props.route

      yelp_search.fetchList(this.state.searchString, function(result) {
      if (result.businesses) {
        nav.push({
          component: SearchResult,
          passProps: {
            data: result
          }
        })
      } else{
        alert(result.error.text)
      };
    })
  }

  _handleUserCurrentLocation() {
    let position = this.state.position
    console.log("Cureent location :", position.coords.latitude + "," + position.coords.longitude)
    this.state.searchString = position.coords.latitude + "," + position.coords.longitude
    this._searchAgents()
  }

  _onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  _onSubmitSearchText = () => {
    if(this.state.isConnected){
      this._searchAgents()
    } else {
      alert(Texts.noInternetError)
    }  
}

  render() {
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>{Texts.description}</Text>
      <TextInput style = {styles.searchInput}
        autoCapitalize = "words"
        returnKeyType = {'search'}
        value = { this.state.searchString}
        onChange = { this._onSearchTextChanged.bind(this) }
        onSubmitEditing = { this._onSubmitSearchText.bind() }
        placeholder = { Texts.placeholderText }
      />
      <Image style = { styles.homeImage } source = {homeImage}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  description: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#1F95E3'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1F95E3',
    borderRadius: 8,
    color: '#1F95E3'
  },
  homeImage: {
    height: 200,
    width: 200,
    marginTop: 20,
    justifyContent: 'center',
  }
});

module.exports = Search;
