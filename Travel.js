import React, { Component } from 'react';
import { Container , Content, Button, Text} from 'native-base';

export default class Travel extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Button rounded success style = { { alignSelf: 'center', padding: 30 } } onPress={() => this.props.navigation.navigate('NewRide')}>
                        <Text>
                            Submit Ride Request
                        </Text>
                    </Button>

                    <Button rounded info style = { { alignSelf: 'center', padding: 30 } } onPress={() => this.props.navigation.navigate('MyTravels')}
                        >
                        <Text>
                            My Travels
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
};