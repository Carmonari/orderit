import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import socketIO from 'socket.io-client';
import MapView, { Marker } from 'react-native-maps';
import PolyLine from '@mapbox/polyline';

import SideDrawer from '../common/SideDrawer';
import Header from '../common/Header';

export default class Tracking extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      latitude: null,
      longitude: null,
      predictions: [],
      pointCoords: [],
      routeResponse: '',
      lookingForDelivery: false,
      textDelivery: "Buscando repartidor...",
      driverIsOnTheWay: false,
      driverLocation: []
    }
  }

  componentDidMount(){
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.getRouteDirections();
        this.requestDelivery();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000,  maximumAge: 1000 },
    );
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  async getRouteDirections(){
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.latitude},${this.state.longitude}&key=AIzaSyDcS03AM2Nh90g0VTGxA-5KN98scaz6eqw`
      );
      const json = await response.json();
      console.warn(Object.keys(json) + " si ");
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
        routeResponse: json
      });
      Keyboard.dismiss();
      this.map.fitToCoordinates(pointCoords)
      
      console.warn(this.state.routeResponse);
    } catch (err) {
      console.error(err);
    }
  }

  back = async () => {
    await this.props.history.push('/home');
    return true;
  }

  async requestDelivery() {
    this.setState({
      lookingForDelivery: true
    });
    const socket = await socketIO.connect("http://192.168.15.2:3000");
    socket.on("connect", () => {
      console.log("connected");
      //Request taxi
      socket.emit("deliveryRequest", this.state.routeResponse);
    });

    socket.on("deliveryLocation", (deliveryLocation) => {
      let pointCoords = [...this.state.pointCoords, deliveryLocation];
      this.map.fitToCoordinates(pointCoords, {
        edgePadding: {top:40, bottom: 20, left: 20, right:20}
      });
      this.setState({
        lookingForDelivery: false,
        driverIsOnTheWay: true,
        deliveryLocation: deliveryLocation
      });
    })
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
