import * as React from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const win = Dimensions.get('window');

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
                <Text style={styles.boldText}>Hold the camera</Text>
                <Text style={styles.boldText}>to the QR sticker</Text>
                <Image style={{margin: 90, width: win.width * 252/375, height: win.height * 252/812}}source={require('./QR_example.png')} />
                <Text style={styles.boldText}>Scanning...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boldText: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
        fontWeight: "bold",
        fontSize: 35,

    },
});