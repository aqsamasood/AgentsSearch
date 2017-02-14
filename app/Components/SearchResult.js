import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, LayoutAnimation, TabBarIOS} from 'react-native';

class SearchResult extends Component {
  state = {
    toggled: true,
    results: this.props.data,
    selectedTab: 'listTab',
  };


  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="black"
        unselectedItemTintColor="white"
        barTintColor="darkslateblue">
        <TabBarIOS.Item
          title="List"
          icon={require('./location-icon.png')}
          selected={this.state.selectedTab === 'listTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'listTab',
            });
          }}>
         <AgentList data = {this.state.results.businesses} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./location-icon.png')}
          selectedIcon={require('./location-icon.png')}
          title="More"
          selected={this.state.selectedTab === 'mapTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mapTab',
              presses: this.state.presses + 1
            });
          }}>
          <LocationMapView data = {this.state.results}/>
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