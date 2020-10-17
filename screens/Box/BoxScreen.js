import * as React from 'react';
import { Text, View } from 'react-native';

export default class BoxScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Box box</Text>
            </View>
        )
    }
}