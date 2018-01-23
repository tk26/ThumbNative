import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';

export default class LoginSuccess extends Component {
    logout() {
        AsyncStorage.removeItem('thumb_token');
        this.props.navigation.navigate('Signup');
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text> 
                            User successfully authenticated.
                        </Text>
                    </View>
                    <Button rounded info style = { { alignSelf: 'center' } } onPress={() => this.logout()}>
                            <Text>
                                Logout
                            </Text>
                        </Button>
                </Content>
            </Container>
        );
    }
}