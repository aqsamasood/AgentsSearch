import React, { Component } from 'react';
import { AppRegistry, NavigatorIOS, StyleSheet } from 'react-native'
import Search from './app/components/Search'

class AgentsSearch extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Search,
          title: 'Search Agents',
        }}
        style={{flex: 1}} />
    );
  }
}

AppRegistry.registerComponent('AgentsSearch', () => AgentsSearch);
