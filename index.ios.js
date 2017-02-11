
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var SearchPage = require('./app/UIComponents/Search');

class Welcome extends Component {
	render() {
		return(
			<View style = {{width: 100, height: 100, paddingTop: 100, backgroundColor: 'green'}}>
			<Text> Hello World, Aqsa </Text>
			</View>
		);
	}
}
export default class AgentsSearch extends Component {
  render() {
   return (
      <NavigatorIOS
        initialRoute={{
          component: SearchPage,
          title: 'Real Estate Agents Finder',
        }}
        style={{flex: 1}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AgentsSearch', () => AgentsSearch);
