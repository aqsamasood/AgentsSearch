import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class AgentCell extends Component {
  render() {
    var agent = this.props.agent;
    return (
      <View style = {{paddingLeft: 10, paddingRight: 10, alignItems: 'flex-start'}}>
      <TouchableOpacity style={styles.cell}>
      <View style= {{flexDirection: 'column'}}>
      <View style = {{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
        <Image source={{uri: agent.image_url}}
        style={{width: 80, height: 80, justifyContent: 'flex-start'}} />

       <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>{agent.name}</Text>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style = {{fontWeight: 'bold'}}> Rating: </Text>
          <Text style = {{color: '#1F95E3'}}>{agent.rating}</Text>
        </View>
         <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style = {{fontWeight: 'bold'}}> Phone: </Text>
          <Text style = {{color: '#1F95E3'}}>{agent.phone}</Text>
         </View>
        <View style={{flexDirection: 'row', paddingTop: 5}}>
          <Text style = {{fontWeight: 'bold'}}> Address: </Text>
          <Text style = {{fontWeight: 'bold', fontSize: 10, marginRight: 5}}>{agent.location.display_address.toString()}</Text>
        </View>
       </View>
       </View>
      <Text style = {{flex: 2, paddingTop: 10}}>{agent.snippet_text}</Text>
      <View style = {{flex: 3, marginTop: 10, height: 1, backgroundColor: '#1F95E3'}} />
      </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cell: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
  }
})

module.exports = AgentCell;