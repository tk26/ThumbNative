import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreditCardInput } from 'react-native-credit-card-input';

const initialState = {
    isValid: false,
    values: { },
    stripeToken: '',
    customerId: ''
};

var stripe_url = 'https://api.stripe.com/v1/';
var secret_key = 'pk_test_nSKvy2nLlAZeVNtcyMl03gMJ';

export default class AddPaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    _onChange = (form) => {
        this.setState({
            isValid: form.valid,
            values: form.values
        })
    }

    saveCard() {
        var cardDetails = {
            "card[number]": this.state.values.number,
            "card[exp_month]": this.state.values.expiry.substring(0,2),
            "card[exp_year]": this.state.values.expiry.substring(3),
            "card[cvc]": this.state.values.cvc
        };

        var formBody = [];
        for (var property in cardDetails) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(cardDetails[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(stripe_url + 'tokens', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + secret_key
            },
            body: formBody
        }).then( response => response.json())
        .then( data => {
            this.setState({
                stripeToken: data.id
            });
        })
        .then( () => {
            var customerDetails = {
                "email": "tejakumt@indiana.edu", //TODO take from profile
                "source": this.state.stripeToken
            };

            var formBody2 = [];
            for (var property in customerDetails) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(customerDetails[property]);
                formBody2.push(encodedKey + "=" + encodedValue);
            }
            formBody2 = formBody2.join("&");

            fetch(stripe_url + 'customers', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + 'sk_test_G0A5SoF2Du8KVR0MPDzE4hRO'
                },
                body: formBody2
            }).then( response => response.json())
            .then( customer => {
                this.setState({
                    customerId: customer.id
                });
            })
            .catch( error => console.log(error) );
        })
        .catch( error => console.log(error) );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Content style = { { padding: 20 } }>
                    <CreditCardInput onChange={this._onChange.bind(this)} requiresCVC/>
                    <Button rounded success disabled={!this.state.isValid}
                        style = { { alignSelf: 'center' } }
                        onPress = { () => this.saveCard() }
                    >
                        <Text>
                            Save
                        </Text>
                    </Button>

                    <View>
                        <Text>
                            {this.state.stripeToken}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            {this.state.customerId}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}