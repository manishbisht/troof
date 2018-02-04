/**
 * Created by manish on 3/2/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View, Button} from 'react-native';

export default class TabPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var PlacesList = this.props.nearByData.map(function (place, index) {
            return (
                <Text key={place.place_id}>{place.name}</Text>
            );
        }, this);

        return (
            <View style={{padding: 0}}>
                <Text
                    style={{fontSize: 27}}>
                    {this.props.index}
                    {this.props.userLocation.latitude}
                </Text>
                {this.props.nearByError != 'showaccount' && PlacesList}
            </View>
        )
    }
}