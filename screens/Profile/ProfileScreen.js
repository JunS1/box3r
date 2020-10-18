import * as React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'

import Settings from './Settings'

let {height, width} = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
    state = {
        settings: false
    }

    toggleSettings = () => {
        this.setState({settings: !this.state.settings})
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../../assets/profile_background.png")} style={styles.image}/>
                <View style={styles.header}>
                    <Image style={{right: width / 2 * 0.7}}source={require("../../assets/picture.png")} />
                    <Text style={styles.name}>Kimmy Lee</Text>
                    <TouchableOpacity onPress={this.toggleSettings}>
                        <Image style={{position: "absolute", top: -height * 0.05, left: width * 0.25}}source={require("../../assets/settings.png")}/>
                    </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.content}>
                    <View style={{marginTop: 20, flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                        <Image source={require("../../assets/box1.png")}/>
                        <Image source={require("../../assets/box2.png")}/>
                    </View>
                    <View style={{marginTop: 20, flexDirection: "row", justifyContent: "space-around", backgroundColor: "#67C021", alignSelf: "center", width: 300}}>
                        <Image source={require("../../assets/easy-money.png")} />
                        <Text style={{alignSelf: "center", color: "#FFFFFF", fontSize: 25, fontWeight: "600"}}>Coupons</Text>
                        <Text style={{alignSelf: "center", color: "#FFFFFF", fontSize: 25, fontWeight: "600"}}>{">"}</Text>
                    </View>
                    <View style={{marginTop: 20, padding: 10, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontWeight: "600", fontSize: 16}}>Goals</Text>
                        <Image style={{marginTop: 10}} source={require("../../assets/line.png")}/>
                    </View>
                    <View style={{marginTop: 20, padding: 10, justifyContent: "center", alignItems: "center"}}>
                        <Image style={{height: 129, width: 321, shadowOffset:{  width: 10,  height: 10,  }, shadowColor: 'black', shadowOpacity: 1.0,}}source={require("../../assets/goal.png")}/>
                    </View>
                    
                </ScrollView>
                <Modal
                    isVisible={this.state.settings}
                    onBackdropPress={this.toggleSettings} // Android back press
                    onSwipeComplete={this.toggleSettings} // Swipe to discard
                    animationIn="slideInLeft" // Has others, we want slide in from the left
                    animationOut="slideOutLeft" // When discarding the drawer
                    swipeDirection="left" // Discard the drawer with swipe to left
                    useNativeDriver // Faster animation
                    hideModalContentWhileAnimating // Better performance, try with/without
                    propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
                    style={styles.sideMenuStyle} // Needs to contain the width, 75% of screen width in our case
                >
                    <Settings signOut={this.props.signOut} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '50%',
        resizeMode: 'cover'
    },
    text: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold"
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#F8F8F8",
        position: 'absolute',
        top: 0,
        marginTop: height * 0.24,
        width: width,
        height: height,
    },
    header: {
        flexDirection: "row",
        position: "absolute",
        top: 0,
        marginTop: height * 0.12,
        justifyContent: "center",
    },
    name: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 30,
        alignSelf: "center",
        position: "absolute"
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75 // SideMenu width
    },
});

// const styles = StyleSheet.create({
    
//     center: {
//       width: '100%',
//       height: '100%',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     behind: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       width: '100%',
//       height: '100%'
//     }
//   })
  