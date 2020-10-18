import * as React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from "./Firebase"

import ProfileScreen from './screens/Profile/ProfileScreen'
import BoxScreen from './screens/Box/BoxScreen'
import ScannerScreen from './screens/Scanner/ScannerScreen'
import LoginScreen from './screens/Authentication/LoginScreen';

const Tab = createBottomTabNavigator();

const tabActiveColor = '#67C021';
const tabInactiveColor = '#B1B1B1';


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

    logOut = () => {
        this.setState({ loggedIn: false });
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
                            tabStyle: {justifyContent: 'center', alignItems: 'center'},
                            showLabel: false
                        }}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let tabIcon;
                                if (route.name === "Box") {
                                    tabIcon = require('./assets/box.png');
                                } else if (route.name === "Scanner") {
                                    tabIcon = require('./assets/scanner.png');
                                } else if (route.name === "Profile") {
                                    tabIcon = require('./assets/profile.png');
                                }
                                return (
                                    <Image
                                        source={tabIcon}
                                        resizeMode='contain'
                                        style={{
                                            height: 30,
                                            width: 30,
                                            tintColor: focused ? tabActiveColor : tabInactiveColor
                                        }}
                                    />
                                )
                            }
                        })}
                    > 
                        <Tab.Screen name="Box" component={BoxScreen} />
                        <Tab.Screen name="Scanner" component={ScannerScreen} />
                        <Tab.Screen name="Profile" children={() => <ProfileScreen signOut={this.logOut} />} />
                    </Tab.Navigator>
                }
            </NavigationContainer>
        );
    }
}