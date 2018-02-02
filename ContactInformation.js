import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Config from 'react-native-config';
import { Container, Content, View, Text, Card, CardItem, Button, Form, Input, Item } from 'native-base';

const initialState = {
    phone: '',
    phoneVerificationId: '',
    validationResponse: '', 
    isSuccessful: false,
    currentStep: 0
}

export default class ContactInformation extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        this.setState({ validationResponse: "" });
        if(!this.state.phone || this.state.phone.length !== 10) {
                this.setState({ validationResponse: "Error: Phone number should be of 10 digits" });
            }
        else {
            this.setState({ validationResponse: "Saving phone number..." });
            this.savePhone();
        }
    }

    validate2() {
        this.setState({ validationResponse: "" });
        if(!this.state.phoneVerificationId) {
                this.setState({ validationResponse: "Error: Please input phone verification Id" });
            }
        else {
            this.setState({ validationResponse: "Verifying phone number..." });
            this.verifyPhone();
        }
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    savePhone() {
        fetch(Config.API_URL+'/user/phone/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "phone" : this.state.phone
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState({ 
                validationResponse: "Phone Number Successfully saved. Please make sure you've verified it.",
                currentStep: 1
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot save the phone." }) )
    }

    verifyPhone() {
        fetch(Config.API_URL+'/user/phone/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "phoneVerificationId" : this.state.phoneVerificationId
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState({ 
                validationResponse: "Phone Number Successfully verified.",
                currentStep: 2
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot verify the phone number." }) )
    }

    render() {
        // TODO if already saved, show saved number and ask to verify
        if(this.state.currentStep === 0) {
            return (
                <Container>
                    <Content style = { { padding: 20 } }>
                        <Card style = {{ padding: 20 }}>
                            <CardItem header style = { { alignSelf: 'center' } }>
                                <Text>
                                    Add a Phone number
                                </Text>
                            </CardItem>

                            
                            <TextInput placeholder="1234567890" maxLength={10} minLength={10}
                                onChangeText={(phone) => this.setState({phone})} 
                                value={this.state.phone}/>

                            <CardItem footer style = { { alignSelf: 'center' } }>
                                <Button bordered dark onPress={() => this.validate()}>
                                    <Text>
                                        Save Phone
                                    </Text>
                                </Button>
                            </CardItem>
                        </Card>

                        <View style = { { alignSelf: 'center' } }> 
                            <Text>
                                {this.state.validationResponse}
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
        else if(this.state.currentStep === 1) {
            return (
                <Container>
                    <Content style = { { padding: 20 } }>
                        <Card style = {{ padding: 20 }}>
                            <CardItem header style = { { alignSelf: 'center' } }>
                                <Text>
                                    Verify your phone number
                                </Text>
                            </CardItem>

                            
                            <TextInput placeholder="verification Id" maxLength={10}
                                onChangeText={(phoneVerificationId) => this.setState({phoneVerificationId})}
                                value={this.state.phoneVerificationId}/>

                            <CardItem footer style = { { alignSelf: 'center' } }>
                                <Button bordered dark onPress={() => this.validate2()}>
                                    <Text>
                                        Verify
                                    </Text>
                                </Button>
                            </CardItem>
                        </Card>

                        <View style = { { alignSelf: 'center' } }> 
                            <Text>
                                {this.state.validationResponse}
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                Phone number successfully verified.
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}