import React from 'react'
import {
    ScrollView, 
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
                // navigate to tab navigation
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
            })
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

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
                    <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20}}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
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
        backgroundColor: "#0BB68C",
        borderRadius: 30,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})