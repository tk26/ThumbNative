import React, { Component } from 'react';
import { Container, Content, View, Text, Card, CardItem, Button } from 'native-base';

export default class DescribeYourself extends Component {
    render() {
        return (
            <Container>
                <Content style = { { padding: 20 } }>
                    <Card style = {{ padding: 20 }}>
                        <CardItem header style = { { alignSelf: 'center' } }>
                            <Text>
                                Your bio
                            </Text>
                        </CardItem>

                        <CardItem footer style = { { alignSelf: 'center' } }>
                            <Button bordered dark>
                                <Text>
                                    Save bio
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}