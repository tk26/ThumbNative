import React, { Component } from 'react';
import { Container, Content, View, Text } from 'native-base';

export default class SignupSuccess extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text> 
                            Account successfully created. Please check your email and verify the account.
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}