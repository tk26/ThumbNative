import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddProfilePicture extends Component {
    render() {
        return (
            <Container>
                <Content style = { { padding: 20 } }>
                    <Card style = { { padding: 20 } }>
                        
                        <CardItem header style = { { alignSelf: 'center' } }>
                            <Icon name="user" size={100} />
                        </CardItem>
                        
                        <CardItem>
                            <Body>
                                <Text style = { { textAlign: 'center' } }>
                                    This helps your fellow riders and drivers recognize
                                    you when you meet. Make sure your photo clearly shows
                                    your face and doesn't include any personal or sensitive
                                    info you'd rather not have others see.
                                </Text>
                            </Body>
                        </CardItem>
                        
                        <CardItem footer style = { { alignSelf: 'center' } }>
                            <Button bordered dark>
                                <Text>
                                    Upload Photo
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}