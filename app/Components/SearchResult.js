import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, LayoutAnimation, TabBarIOS} from 'react-native';

const AgentList = require('./AgentList')
const globeIcon = require('../Resources/globe-icon.png')
const listIcon  = require('../Resources/list-icon.png') 

class SearchResult extends Component {
  state = {
    toggled: true,
    results: this.props.data,
    selectedTab: 'listTab',
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor = "black"
        tintColor = "white"
        unselectedItemTintColor = "black"
        barTintColor = "#1F95E3">
        <TabBarIOS.Item
          title = "List"
          icon = { listIcon }
          selected = { this.state.selectedTab === 'listTab'}
          onPress = {() => {
            this.setState({
              selectedTab: 'listTab',
            });
          }}>
         <AgentList data = {this.state.results.businesses} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon = { globeIcon }
          title = "Map"
          selected = { this.state.selectedTab === 'mapTab' }
          onPress={() => {
            this.setState({
              selectedTab: 'mapTab',
            });
          }}>
          <View style = {{flex: 1 , backgroundColor : 'red'}}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = SearchResult
