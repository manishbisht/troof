/**
 * Created by manish on 4/2/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View, Button, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

let {width, height} = Dimensions.get('window');

export default class PlaceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeData: '',
            placeError: '',
        };
    }

    componentDidMount() {
        var self = this;
        var base = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
        var placeID = this.props.keye;
        var key = 'AIzaSyBnrN3ItuATQhSrpzvp_DV6DQk6-tSN5tg';
        var url = base + placeID + '&key=' + key;

        /*const res = await fetch(url);
        const {data} = await res.json();
        await this.setStateAsync({placeData: data.results});*/
    }

    render() {
        return (
            <View style={{borderBottomWidth: 2}}>
                <Text
                    style={{fontSize: 27, width: width * 0.75}}>
                    {this.props.data.name}
                </Text>
            </View>
        )
    }
}