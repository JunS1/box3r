import * as React from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default class ScannerScreen extends React.Component {

    async componentDidMount() {
        Location.setGoogleApiKey("AIzaSyDqDlZmfJJNFM2F9mlOYJSH2zSNrr6BEx8")
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        let coords = {latitude: location.coords.latitude, longitude: location.coords.longitude}
        let options = {useGoogleMaps: true}
        let address = await Location.reverseGeocodeAsync(coords, options)
        console.log(address)
        console.log(coords)

    }


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Scanner</Text>
            </View>
        )
    }
}