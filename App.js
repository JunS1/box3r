import * as React from 'react';
import { Text, View } from 'react-native';
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
        loggedIn: false
    }

    componentDidMount() {
        if (firebase.auth().currentUser) {
            this.setState({ loggedIn: true });
        } else {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    this.setState({
                        loggedIn: true
                    })
                }
            }) 
        }
    }

    logIn = () => {
        this.setState({ loggedIn: true });
    }

    render () {
        return (
            <NavigationContainer>
                {!this.state.loggedIn ? 
                    <LoginScreen logIn={this.logIn} /> 
                :
                    <Tab.Navigator> 
                        <Tab.Screen name="Box" component={BoxScreen} />
                        <Tab.Screen name="Scanner" component={ScannerScreen} />
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                    </Tab.Navigator>
                }
                
            </NavigationContainer>
        );
    }
}