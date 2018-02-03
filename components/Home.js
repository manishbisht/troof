/**
 * Created by manish on 30/1/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, View, Button, Dimensions, AppRegistry} from 'react-native';
import {MapView, Marker} from 'expo';

let {width, height} = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRegion: {
                latitude: 26.9124,
                longitude: 75.7873,
                latitudeDelta: 0.0922 * 1.5,
                longitudeDelta: 0.0421 * 1.5,
            },
            userLocation: {
                latitude: 26.9124,
                longitude: 75.7873
            },
            error: null,
        };

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            (position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.00922 * 1.5,
                    longitudeDelta: 0.00421 * 1.5
                };
                this.onRegionChange(region);
            },
            (error) => this.setState({ error: error.message }),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
        );
    }

    onRegionChange(region) {
        this.setState({
            currentRegion: region,
            userLocation: {
                latitude: region.latitude,
                longitude: region.longitude
            }
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <ScrollView style={{padding: 0}}>
                <MapView style={{height: height / 2}}
                         onRegionChange={this.onRegionChange}
                         region={this.state.currentRegion}>
                    <MapView.Marker
                        key={1}
                        coordinate={this.state.userLocation}
                        title={"Some Title"}
                        description={"Hello world"}
                    />
                </MapView>
                <Text
                    style={{fontSize: 27}}>
                    Welcome {this.state.userLocation.latitude} {this.state.userLocation.longitude} {this.state.error}
                </Text>
                <Button
                    onPress={this.props.onLogoutPress}
                    title="Logout"
                />
            </ScrollView>
        )
    }
}