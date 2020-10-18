import * as React from 'react';
import { Text, View, Image, Dimensions, Platform, StyleSheet, ScrollView } from 'react-native';
import firebase from "../../Firebase";
import * as Location from 'expo-location';

const win = Dimensions.get('window');
const ratio1 = (194/375);
const ratio2 = (151/804);
const boxSize = (78/375) * win.width;

export default class BoxScreen extends React.Component {

    state = {
        boxes: []
    }

    componentDidMount =  async () => {
        Location.setGoogleApiKey("AIzaSyDqDlZmfJJNFM2F9mlOYJSH2zSNrr6BEx8")
        let options = {useGoogleMaps: true}
        let newBoxes = this.state.boxes;
        await firebase.database().ref('boxes').once("value")
            .then(async (dataSnapShot) => {
                let boxes = dataSnapShot.val()
                for (let box in boxes) {
                    let boxObj = {}
                    let currBox = boxes[box];
                    boxObj.name = currBox.name
                    boxObj.track = []
                    for (let block in currBox.boxChain) {                        
                        if (block !== "0") {
                            let addressArray = await Location.reverseGeocodeAsync(currBox.boxChain[block].location, options);
                            let addressObj = addressArray.length > 0 ? addressArray[0] : null
                            
                            let country = addressObj !== null ? (addressObj.country || "unkown") : "unknown";
                            let region = addressObj !== null ? (addressObj.region || "unkown") : "unkown";
                            let addressString = addressObj ? country + ", " + region : "unknown"
                            boxObj.track.push(addressString)
                        }
                    }
                    newBoxes.push(boxObj)
                }
            })
        this.setState({
            boxes: newBoxes
        })
    }

    renderRow = (name, progress) => {
        return(
            <View style={{ flexDirection: "column", alignItems: "flex-start", margin: 30 }} >
                <View style ={{flexDirection: "row"}}>
                    <Image style={{width:boxSize, height:boxSize, marginRight: 15}} source={require('./box.png')} />
                        <View>
                            <Text></Text>
                            <Text style={styles.boxName}>{name}</Text>
                            <View style={{flexDirection: "row", marginTop: 5}}>
                                <Image style={{width: 13, height: 10}} source={require('./Vector.png')} />
                                <Text>{progress}</Text>
                            </View>
                        </View>
                    </View>

            </View>                    
        )
    }

    render() {
        return (
            <ScrollView fadingEdgeLength={3} bounces={true} style={{flex: 1, margin: 30, marginLeft: 0, marginRight: 0}}>
                <Text style={styles.helloText}>Hi, brother!</Text>
                <Image style={{width:win.width * ratio1, height:win.height * ratio2}} source={require('./cat.png')} />
                <View style={styles.dividerLine}></View>
                <Text style={styles.labelText}>Current Boxes</Text>
                {
                    this.state.boxes.map((box, idx) => {
                        {return this.renderRow(box.name, box.track[0])}
                    })
                }
                <View style={styles.dividerLine}></View>
                <Text style={styles.labelText}>Past Boxes</Text>
                {this.renderRow("Bob", "In process...")}
                {this.renderRow("Greg", "Recycled! (Amazon package)")}
                {this.renderRow("J-Hope", "Recycled! (Lowe's package)")}
            </ScrollView>
        )
    }

    
}

const styles = StyleSheet.create({
    helloText: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 60,
        // marginBottom: 30,
        marginLeft: 30
    },

    labelText: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
        fontWeight: "600",
        fontSize: 18, 
        margin: 30
    },

    boxName: {
        fontFamily: (Platform.OS === 'ios') ? 'Helvetica' : 'Roboto',
        fontWeight: "700",
        fontSize: 20, 
        // margin: 30
    },

    dividerLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.75,
    },
});