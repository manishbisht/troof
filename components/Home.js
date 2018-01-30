/**
 * Created by manish on 30/1/18.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

let { width, height } = Dimensions.get('window');

export default class Home extends Component {
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <MapView style={{height: height / 2}}
                         initialRegion={{
      latitude: 27.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
                />
                <Text
                    style={{fontSize: 27}}>
                    Welcome
                </Text>
                <Button
                    onPress={this.props.onLogoutPress}
                    title="Logout"
                />
            </ScrollView>
        )
    }
}