import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, View, Text } from 'native-base';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            HOME
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}