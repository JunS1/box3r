import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from "./Firebase"

import ProfileScreen from './screens/Profile/ProfileScreen'
import BoxScreen from './screens/Box/BoxScreen'
import ScannerScreen from './screens/Scanner/ScannerScreen'
import LoginScreen from './screens/Authentication/LoginScreen';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    state = {
        loggedIn: false,
        isLoading: true,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({
                    loggedIn: true,
                    isLoading: false
                });
            }
        })
        setTimeout(() => this.setState({ isLoading: false }), 1000);
    }

    logIn = () => {
        this.setState({ loggedIn: true });
    }

    render () {
        return (
            this.state.isLoading ? <ActivityIndicator style={{justifySelf: 'center', alignSelf: 'center'}}/> :
            <NavigationContainer>
                {!this.state.loggedIn ? 
                    <LoginScreen logIn={this.logIn} /> 
                :
                    <Tab.Navigator 
                        tabBarOptions={{
                            tabStyle: {justifyContent: 'center', alignItems: 'center'}
                        }}
                    > 
                        <Tab.Screen name="Box" component={BoxScreen} />
                        <Tab.Screen name="Scanner" component={ScannerScreen} />
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                    </Tab.Navigator>
                }
            </NavigationContainer>
        );
    }
}