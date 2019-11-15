import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import SideDrawer from '../common/SideDrawer';
import Header from '../common/Header';

export default class Tracking extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      latitude: null,
      longitude: null,
      destination: '',
      predictions: [],
      pointCoords: [],
      routeResponse: '',
      lookingForDelivery: true,
      textDelivery: "Buscando repartidor...",
      driverIsOnTheWay: false,
      driverLocation: []
    }
  }

  componentDidMount(){
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000,  maximumAge: 1000 },
    );
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  async getRouteDirections(placeId, destinationName){
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude}, ${this.state.longitude}&destination=place_id:${placeId}&key=AIzaSyDcS03AM2Nh90g0VTGxA-5KN98scaz6eqw`
      );
      if(placeId){
        const json = await response.json();
        console.log(destinationName);
        const points = PolyLine.decode(json.routes[0].overview_polyline.points);
        const pointCoords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        })
        this.setState({
          pointCoords,
          predictions: [],
          destination: destinationName,
          routeResponse: json
        });
        Keyboard.dismiss();
        this.map.fitToCoordinates(pointCoords)
      }
    } catch (err) {
      console.error(err);
    }
  }

  back = async () => {
    await this.props.history.push('/home');
    return true;
  }

  render(){
    let marker = null;
    let deliveryButton = null;
    let findingDeliveryActIndicator = null;
    let driverMarker = null;

    if(this.state.latitude === null) return null;

    if(this.state.lookingForDelivery){
      findingDeliveryActIndicator = (
        <ActivityIndicator size="large" animating={this.state.lookingForDelivery} />
      )
    }

    deliveryButton = (
      <View style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>{this.state.textDelivery}</Text>
        {findingDeliveryActIndicator}
      </View>
    );

    return(
      <SideDrawer >
        <Header menu={false} open={this.back} carro={this.props.numberItems} />
        <View style={styles.flex1}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {deliveryButton}
        </View>
      </SideDrawer>
    )
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bottomButton: {
    backgroundColor: 'black',
    marginTop: 'auto',
    marginBottom: 30,
    padding:20,
    paddingHorizontal: 30,
    alignSelf: 'center'
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18
  }
});
