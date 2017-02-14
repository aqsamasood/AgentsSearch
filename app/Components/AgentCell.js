import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class AgentCell extends Component {
  render() {
    var agent = this.props.agent;
    return (
      <TouchableOpacity style={styles.cell}>
        <Image source={{uri: agent.image_url}}
       style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
       <View style={{flexDirection: 'column', justifyContent: 'center'}}>
         <Text style={styles.viewOneViewTitle}>{agent.name}</Text>
         <Text>Rating: {agent.rating}</Text>
         <Text style= {styles.viewOneViewPhone}>Phone: {agent.display_phone}</Text>
       </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    cell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 5,
  }
})

module.exports = AgentCell;