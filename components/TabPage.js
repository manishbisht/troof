/**
 * Created by manish on 3/2/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View, Button} from 'react-native';

export default class TabPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nearByData: [],
            nearByError: "",
        };
    }

    componentDidMount() {
        var self = this;
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.props.userLocation.latitude + ',' + this.props.userLocation.longitude + '&radius=5000&types=police&key=AIzaSyBnrN3ItuATQhSrpzvp_DV6DQk6-tSN5tg';

        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        self.setState({
                            nearByData: data.results,
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    render() {
        var PlacesList = this.state.nearByData.map(function (place, index) {
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
                {PlacesList}
            </View>
        )
    }
}