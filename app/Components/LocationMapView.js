import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, LayoutAnimation} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

class LocationMapView extends Component {
  constructor(props) {
    super(props)

  this.state = {
    span: this.props.data.region.span,
    center: this.props.data.region.center,
    annotations: this.props.data.businesses.map((result) => {
      return this._getAnnotations(result);
      })
    };
  }
   
  _getRegion = () => {
    return {
    latitude: this.state.center.latitude,
    longitude: this.state.center.longitude,
    latitudeDelta: this.state.span.latitude_delta,
    longitudeDelta: this.state.span.longitude_delta,
    }
  }

  _getAnnotations = (result) => {
    const location = result.location
    return {
      longitude: location.coordinate.longitude,
      latitude: location.coordinate.latitude,
      title: result.name,
      description: location.display_address.toString(),
      image: require('../Resources/location-icon.png'),
      photo: result.image_url,
      rating: result.rating,
      phone: result.display_phone,
    }
  }

  render() {
    const annotations = this.state.annotations
    return (
      <MapView 
        style={styles.map}
        region={this._getRegion()}>
        { annotations.map((annotation, i) => {
          return (
            <Marker style = {styles.marker}
              key = {i}
              coordinate = {{ latitude: annotation.latitude, longitude: annotation.longitude }}>
              <View>
              <Image style = {{width: 40, height: 40}} source= {annotation.image} />
              </View>
              <Callout>
                <View style = {styles.callout}>
                  <View style = {styles.container}>
                    <Image style = {styles.image} source={{uri: annotation.photo}} />
                    <View style = {styles.titleContainer}>
                      <Text lineBreakMode="tail" style = {styles.title}> {annotation.title} </Text>
                      <Text style = {styles.phone}> {annotation.phone} </Text>
                    </View>
                  </View>
                  <Text style = {styles.description}> {annotation.description}></Text>
                </View>
              </Callout>
          </Marker>
          )
        })
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    width: 200,
    alignItems: 'center'
  },
  callout: {
    height: 80,
    flexDirection: 'column',
  },
  container: {
    flex: 3,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  description: {
    flex: 2,
    fontSize: 12,
    paddingTop: 5,
  },
  image: {
    width: 50,
    height: 50,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'column'
  },
  title: {
    height: 30,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  phone: {
    height: 15,
    textAlign: 'left',
    fontSize: 10,
    color: '#1F95E3',
  },
   map: {
    flex: 1
  },
})
module.exports = LocationMapView;
