import React from 'react'
import {
    SafeAreaView, 
    Image,
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Keyboard,
    StatusBar,
    Platform
} from 'react-native'
import firebase from '../../Firebase.js'

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
        focused: false
    }

    handleLogin = () => {
        const {email, password} = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password).then(() => {
                // navigate to tab navigation--using callback to set state
                this.props.logIn();
            })
            .catch(error => {
                if (error.code !== "auth/user-not-found") {
                    this.setState({errorMessage: error.message});
                } else {  // new user--add them to database
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
                    .then(() => {
                        this.props.logIn();
                    })
                    .catch(error => {
                        this.setState({errorMessage: error.message})
                    })
                }
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container} keyboardShouldPersistTaps="never">
                <Text style={styles.title}>BOX3R</Text>
                {
                    this.state.errorMessage &&
                    <View style={styles.errorMessage}>
                        <Text style={styles.error}>{this.state.errorMessage}</Text>
                    </View>
                }
                

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none" 
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry 
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20}}>Login/Register</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
             
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30, 
        top: 60
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: 60
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#67C021",
        borderRadius: 30,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 32,
    }
})