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
            isLoggedIn: false
        });
    }

    logout() {
        this.setState({
            isLoggedIn: true
        });
    }

    render() {
        if (this.state.isLoggedIn)
            return <Home onLogoutPress={this.login}/>;
        else
            return <Login onLoginPress={this.logout}/>;
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
