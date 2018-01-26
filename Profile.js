import React, { Component } from 'react';
import { Container, Content, View, Text, Button } from 'native-base';

import { onSignOut } from './auth';

export default class Profile extends Component {
   render() {
        return (
            <Container>
                <Content>
                    <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.props.navigation.navigate('ProfileProgress')}>
                        <Text>
                            Profile Progress
                        </Text>
                    </Button>

                    <Button rounded info style = { { alignSelf: 'center' } } 
                        onPress={() => onSignOut().then(() => this.props.navigation.navigate('SignedOutStack'))}
                        >
                        <Text>
                            Log out
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}