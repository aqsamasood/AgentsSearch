import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, NetInfo, NavigatorIOS } from 'react-native';
import SearchResult from './SearchResult';

const yelp_search = require('../API/yelp_search');
const Texts = {
  description: 'Search for real estate agents by city or country.',
  placeholderText: 'Enter city or country.',
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
      yelp_search.fetchList(this.state.searchString, function(result) {
      if (result.businesses) {
        nav.push({
          title: "Agent List",
          component: SearchResult,
          leftButtonTitle: '',
          onLeftButtonPress: () => nav.pop(),
          passProps: {
            data: result
          }
        })
      } else{
        console.log("Error", result)
        alert(result.error.text)
      };
    })
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
});

module.exports = Search;
