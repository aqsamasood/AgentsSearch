import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const Texts = {
  description: 'Search for real estate agents by city or country.',
  placeholderText: 'Enter city or country.'
}

class Search extends Component {
  state = {
    searchString: '',
  };

  updateText = (text) => {
    this.setState((state) => {
      return {
        currentText: text,
      };
    }); 
}

  render() {
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>{Texts.description}</Text>
      <TextInput style= {styles.searchInput}
        autoCapitalize="words"
        returnKeyType={'search'}
        value={this.state.searchString}
        onSubmitEditing={(event) => this.updateText(
         console.log("on onSubmitEditing: " + event.nativeEvent.text)
        )}
        placeholder= {Texts.placeholderText}
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
    color: '#48BBEC'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
});

module.exports = Search;