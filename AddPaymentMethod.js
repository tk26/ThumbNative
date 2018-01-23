import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreditCardInput } from 'react-native-credit-card-input';

const initialState = {
    isValid: false,
    values: { }
}

export default class AddPaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    _onChange(form) {
        this.setState({
            isValid: form.valid,
            values: form.values
        });
    }

    saveCard() {
        
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Content style = { { padding: 20 } }>
                    <CreditCardInput onChange={this._onChange.bind(this)} 
                        requiresName requiresCVC requiresPostalCode/>
                    <Button rounded success 
                        style = { { alignSelf: 'center' } }
                        onPress = { () => this.saveCard() }
                    >
                        <Text>
                            Save
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}