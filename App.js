import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Login from './components/Login';
import Home from './components/Home';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        this.setState({
            isLoggedIn: true
        });
    }

    logout() {
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        if (this.state.isLoggedIn)
            return <Home onLogoutPress={this.logout}/>;
        else
            return <Login onLoginPress={this.login}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
