import React, { Component } from 'react';
import { Container, Content, View, Text, Button } from 'native-base';

export default class Profile extends Component {
   render() {
        return (
            <Container>
                <Content>
                    <View>
                        <Text>
                            PROFILE
                        </Text>
                    </View>
                    <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.props.navigation.navigate('ProfileProgress')}>
                        <Text>
                            Profile Progress
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}