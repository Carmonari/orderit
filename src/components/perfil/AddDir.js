import React, { Component } from 'react';
import { View, ImageBackground, BackHandler } from 'react-native';
import { PropTypes } from 'prop-types';
import Header from '../common/Header';
import SideDrawer from '../common/SideDrawer';
import styles from '../common/css';
import Boton from '../common/Boton';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import InputText from '../common/InputText';
import { addAddress } from '../../actions/usersActions';

class AddDire extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      calle: '',
      numero_ext: '',
      numero_int: '',
      cp: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: ''
    }
  }
  
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.back);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back);
  }

  back = async () => {
    await this.props.history.goBack();
    return true;
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  guardar = () => {
    const { name, calle, numero_ext, numero_int, cp, colonia, municipio, estado, pais } = this.state;

    const newAddress = {
      name,
      calle,
      numero_ext,
      numero_int,
      cp,
      colonia,
      municipio,
      estado,
      pais
    }

    this.props.addAddress(newAddress, this.props.history);
  }

  render() {
    return (
      <SideDrawer>
        <Header menu={false} open={this.back} />
        <ImageBackground source={require('../../../assets/background.png')} style={[styles.imagenFondo, styles.flex1]}>
          <View style={{margin: 10, flex: 1}}>
            <View style={{height: 50, marginBottom: 10}}>
              <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  details.address_components.map(item => {
                    console.log(item);
                    if(item.types[0] === 'street_number'){
                      this.onChange("numero_ext", item.long_name)
                    } else if(item.types[0] === 'route'){
                      this.onChange("calle", item.long_name)
                    } else if(item.types[0] === 'sublocality_level_1'){
                      this.onChange("colonia", item.long_name)
                    } else if(item.types[0] === 'locality'){
                      this.onChange("municipio", item.long_name)
                    } else if(item.types[0] === 'administrative_area_level_1'){
                      this.onChange("estado", item.long_name)
                    } else if(item.types[0] === 'country'){
                      this.onChange("pais", item.long_name)
                    } else if(item.types[0] === 'postal_code'){
                      this.onChange("cp", item.long_name)
                    }
                  })
                }}

                listViewDisplayed={false}
                getDefaultValue={() => ''}

                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyDcS03AM2Nh90g0VTGxA-5KN98scaz6eqw',
                  language: 'es', // language of the results
                  types: 'geocode' // default: 'geocode'
                }}

                styles={{
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                  listView: {
                    position: 'absolute',
                    zIndex: 2,
                    top: 50,
                    height: 500,
                    width: "100%",
                    backgroundColor: "#FFF"
                  }
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                
                GooglePlacesDetailsQuery={{
                  // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                  fields: 'formatted_address',
                }}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              />
            </View>
            <View>
              <InputText
                label="Nombre de dirección"
                value={this.state.name}
                name="name"
                onChange={this.onChange}
                placeholder="Nombre de dirección"
              />
            </View>
            <View style={{zIndex: 0, position: 'absolute', bottom: 30, width: '100%'}}>
              <Boton style={{zIndex: 0}} mode="contained" onPress={this.guardar} name="Guardar" />
            </View>
          </View>
        </ImageBackground>
      </SideDrawer>
    )
  }
}

AddDire.propTypes = {
  auth: PropTypes.object.isRequired,
  addAddress: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addAddress })(AddDire);