/**
 * Created by manish on 30/1/18.
 */
import React, {Component} from 'react';
import {ScrollView, Text, View, Button, Dimensions, StyleSheet, Animated} from 'react-native';
import {MapView, Marker} from 'expo';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {Ionicons} from '@expo/vector-icons';
import TabPage from './TabPage';

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
            mapRegionError: "",
            nearByData: [],
            nearByError: "",
            index: 0,
            routes: [
                {key: '1', title: 'Ambulance', icon: 'md-heart', color: '#F44336'},
                {key: '2', title: 'Police', icon: 'md-car', color: '#3F51B5'},
                {key: '3', title: 'My Account', icon: 'md-settings', color: '#4CAF50'},
            ],
        };

        this.onRegionChange = this.onRegionChange.bind(this);
        this._handleIndexChange = this._handleIndexChange.bind(this);
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
            (error) => this.setState({mapRegionError: error.message}),
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
        this.getNearbyData(this.state.index);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    getNearbyData(index) {
        var type = "hospital";
        if (index === 1) {
            type = "police";
        } else if (index === 2) {
            this.setState({
                nearByError: "showaccount"
            });
            return;
        }

        var self = this;
        var base = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
        var latitude = this.state.userLocation.latitude;
        var longitude = this.state.userLocation.longitude;
        var key = 'AIzaSyBnrN3ItuATQhSrpzvp_DV6DQk6-tSN5tg';
        var url = base + latitude + ',' + longitude + '&radius=5000&types=' + type + '&key=' + key;

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
                            nearByError: '',
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    _handleIndexChange(index) {
        this.setState({
            index: index,
            nearByData: [],
            nearByError: "loading"
        });
        this.getNearbyData(index);
    }

    _renderIndicator = props => {
        const {width, position} = props;
        const inputRange = [
            0,
            0.48,
            0.49,
            0.51,
            0.52,
            1,
            1.48,
            1.49,
            1.51,
            1.52,
            2,
        ];

        const scale = position.interpolate({
            inputRange,
            outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
        });
        const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(x => {
                const d = x - Math.trunc(x);
                return d === 0.49 || d === 0.51 ? 0 : 1;
            }),
        });
        const translateX = position.interpolate({
            inputRange: inputRange,
            outputRange: inputRange.map(x => Math.round(x) * width),
        });
        const backgroundColor = position.interpolate({
            inputRange,
            outputRange: inputRange.map(
                x => props.navigationState.routes[Math.round(x)].color
            ),
        });

        return (
            <Animated.View
                style={[styles.container, { width, transform: [{ translateX }] }]}
            >
                <Animated.View
                    style={[
            styles.indicator,
            { backgroundColor, opacity, transform: [{ scale }] },
          ]}
                />
            </Animated.View>
        );
    };

    _renderIcon = ({route}) => (
        <Ionicons name={route.icon} size={24} style={styles.icon}/>
    );

    _getLabelText = ({route}) => route.title;

    _renderFooter = props => (
        <TabBar
            {...props}
            getLabelText={this._getLabelText}
            renderIcon={this._renderIcon}
            renderIndicator={this._renderIndicator}
            labelStyle={styles.label}
            tabStyle={styles.tab}
            style={styles.tabbar}
        />
    );

    _renderScene = ({route}) => (
        <ScrollView style={{height: 500}}>
            <TabPage index={this.state.index} userLocation={this.state.userLocation}
                     nearByData={this.state.nearByData} nearByError={this.state.nearByError}
                     onLogoutPress={this.props.onLogoutPress}/>
        </ScrollView>
    );

    render() {
        var ProjectList = this.state.nearByData.map(function (place, index) {
            return (
                <Text key={place.place_id}>{place.name}</Text>
            );
        }, this);

        return (
            <View style={{padding: 0}}>
                <MapView style={{height: height / 2}}
                         onRegionChange={this.onRegionChange}
                         region={this.state.currentRegion}>
                    <MapView.Marker coordinate={this.state.userLocation}/>
                </MapView>
                <View style={{height: height / 2}}>
                    <TabViewAnimated
                        style={this.props.style}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderFooter={this._renderFooter}
                        onIndexChange={this._handleIndexChange}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabbar: {
        backgroundColor: '#222',
    },
    tab: {
        padding: 0,
    },
    icon: {
        backgroundColor: 'transparent',
        color: 'white',
    },
    label: {
        fontSize: 12,
        marginTop: 2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    indicator: {
        width: '100%',
        height: 48,
        borderRadius: 0,
        backgroundColor: '#0084ff',
        margin: 6,
    },
    count: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: -2,
    },
});