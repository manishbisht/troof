/**
 * Created by manish on 4/2/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View, Button, Dimensions, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

let {width, height} = Dimensions.get('window');

export default class PlaceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeData: '',
            placeError: '',
        };

        this.makePhoneCall = this.makePhoneCall.bind(this);
    }

    componentDidMount() {
        var self = this;
        var base = "https://maps.googleapis.com/maps/api/place/details/json?placeid=";
        var placeID = this.props.data.place_id;
        var key = 'AIzaSyBnrN3ItuATQhSrpzvp_DV6DQk6-tSN5tg';
        var url = base + placeID + '&key=' + key;

        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        self.setState({
                            placeData: data.result,
                            placeError: '',
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    makePhoneCall() {
        var number = 'tel:' + this.state.placeData.formatted_phone_number;
        Linking.canOpenURL(number).then(supported => {
            if (supported) {
                Linking.openURL(number);
            }
        });
    }

    render() {
        return (
            <View style={{borderBottomWidth: 2, flexDirection: 'row'}}>
                <View style={{flex:2, padding: 5}} >
                    <Text
                        style={{fontSize: 20}}>
                        {this.props.data.name}
                    </Text>
                </View>
                <View style={{flex:1, padding: 5}} >
                    <Button
                        style={{fontSize: 15}}
                        onPress={this.makePhoneCall}
                        title="Call"
                    />
                </View>
            </View>
        )
    }
}