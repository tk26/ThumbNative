import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class ForgotPassword extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label> Email </Label>
                            <Input />
                        </Item>
                        <Button rounded success style = { { alignSelf: 'center' } }>
                            <Text>
                                Submit
                            </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}