import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, View, Text } from 'native-base';

const initialState = {
    token: ''
};

export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('@thumb:token');
            if (value !== null){
                // We have data!!
                console.log(value);
                this.setState({ token: value });
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
            this.setState({ token: '_|_' });
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text> 
                            User successfully authenticated.
                            <Text>
                                {this.state.token}
                            </Text>
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}