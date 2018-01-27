import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreditCardInput } from 'react-native-credit-card-input';

const initialState = {
    isValid: false,
    values: { },
    stripeToken: '',
    validationResponse: '',
    isSuccessful: false
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

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    savePaymentInformation() {
        fetch('https://vast-everglades-88283.herokuapp.com/user/payment/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "stripeToken" : this.state.stripeToken
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.setState({
                isSuccessful: true
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot save the payment information."}) )
    }

    saveCard() {
        // get the card details
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

        // get stripeToken
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
            this.savePaymentInformation();
        })
        .catch( error => console.log(error) );
    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isSuccessful) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                Payment information successfully saved.
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
        else {
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

                        <View style = { { alignSelf: 'center' } }> 
                            <Text>
                                {this.state.validationResponse}
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}