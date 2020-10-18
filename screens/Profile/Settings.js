import React from "react";
import { Alert, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import firebase from '../../Firebase'


export default class Settings extends React.Component {
    signOut = () => {
        firebase.auth().signOut().then(() => {
            // maybe do call back
            this.props.signOut();
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Title title="Settings" />
                    <View style={styles.oneBlock}>
                        <View style={styles.swithBlock}>
                        </View>
                        <TouchableOpacity style={{padding: 20}} onPress={this.signOut}>
                            <Description text="Log out"/>
                        </TouchableOpacity>     
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const Title = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const Description = ({ text }) => {
    return <Text style={styles.description}>{text}</Text>;
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        margin: 12,
        flex: 1
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        color: "#444",
        fontSize: 14
    },
    swithBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    switchText: {
        fontSize: 14,
        color: "#222"
    },
    link: {
        padding: 5,
        color: "#892853"
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 12,
        marginBottom: 6
    },
   
});