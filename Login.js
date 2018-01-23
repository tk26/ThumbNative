import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';

const initialState = {
    email: '', password: '', validationResponse: ''
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        this.setState({ validationResponse: "" });
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(!this.state.email
            || !this.state.password
            || !reg.test(this.state.email.toLowerCase())
            ) {
                this.setState({ validationResponse: "Error: One or more invalid fields." });
            }
        else {
            this.setState({ validationResponse: "Logging in... Please wait" });
            this.authenticateUser();
        }
    }

    authenticateUser() {
        fetch('https://vast-everglades-88283.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : this.state.email.toLowerCase(),
                "password" : this.state.password
            })
        })
        .then(this.handleErrors)
        .then( response => response.json())
        .then( response => AsyncStorage.setItem('thumb_token', JSON.stringify(response.token)))
        .catch(error => console.log(error))
        .then( () => this.props.navigation.navigate('LoginSuccess'))
        .catch( () => this.setState({ validationResponse: "Error: Cannot authenticate the user."}) )
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Email (.edu)"
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}/>
                        </Item>
                        <Item>
                            <Input placeholder="Password" secureTextEntry = { true } 
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}/>
                        </Item>
                        <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.validate()}>
                            <Text>
                                Login
                            </Text>
                        </Button>
                    </Form>

                    <View style = { { alignSelf: 'center' } }> 
                        <Text>
                            {this.state.validationResponse}
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Do not have an account yet?&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => navigate('Signup')}>
                                Signup
                            </Text>
                        </Text>
                    </View>

                    <View>
                        <Text>
                            Cannot remember the password?&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => navigate('ForgotPassword')}>
                                Forgot
                            </Text>
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}