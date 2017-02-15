import React, { Component } from 'react';
import { ListView } from 'react-native';

const AgentCell = require('./AgentCell')

class AgentList extends Component {
  constructor(props) {
    super(props)
    
    var dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      count: props.data.length,
      results: dataStore.cloneWithRows(props.data)
    }
  }

  render() {
    return (
     <ListView
          style={{flex: 1, paddingTop: 20, paddingBottom: 40}}
          initialListSize={this.state.count}
          dataSource={this.state.results}
          renderRow= {(result) => { return <AgentCell agent = {result} /> }} /> 
    );
  }
}

module.exports = AgentList;