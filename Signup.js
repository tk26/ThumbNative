import React, { Component } from 'react';
import { Platform, Linking } from 'react-native';
import Config from 'react-native-config';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, View } from 'native-base';

const initialState = { 
    firstName: '', lastName: '', email: '',
    school: 'none', password: '', confirmedPassword: '',
    username:'', validationResponse: '', isSuccessful: false
};

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(value) {
        this.setState({
            school: value
        });
    }

    validate() {
        this.setState({ validationResponse: "" })
        let errors = [];
        
        if(!this.state.firstName) {
            errors.push("First Name should be present");
        }

        if(!this.state.lastName) {
            errors.push("Last Name should be present");
        }

        if(this.state.school === 'none') {
            errors.push("Please select your school");
        }

        if(this.state.username.length < 3) {
            errors.push("Username should be between 3 to 20 characters");
        }

        if(this.state.password.length < 8) {
            errors.push("Password should be between 8 to 30 characters");
        }
            
        if(this.state.password !== this.state.confirmedPassword) {
            errors.push("Password and confirm password should match");
        }

        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(!reg.test(this.state.email.toLowerCase())) {
            errors.push("Incorrect email address");
        }

        this.setState({
            validationResponse: errors.toString().split(',').join('\n')
        })

        if(errors.length === 0) {
            if(this.state.email.substr(this.state.email.length - 4) === '.edu') {
                this.saveUser();
            }
            else {
                this.savePotentialUser();
                this.setState({ validationResponse: "Please use your .edu email address to register"});
            }
        }
    }

    savePotentialUser() {
        fetch(Config.API_URL+'/user/potential/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email.toLowerCase(),
                "school" : this.state.school
            })
        })
        .then(this.handleErrors)
        .catch( (error) => {});
    }

    saveUser() {
        fetch(Config.API_URL+'/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email.toLowerCase(),
                "school" : this.state.school,
                "password" : this.state.password,
                "username": this.state.username.toLowerCase()
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.setState({
                isSuccessful: true
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot create an account. Please try again. Could be a duplicate Username or Email Address." }) );
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    render() {
        const { navigate } = this.props.navigation;
        
        if (this.state.isSuccessful) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                Account successfully created. Please check your email and verify the account.
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
                        <Form>
                            <Item>
                                <Input placeholder="First Name" maxLength={20} 
                                    onChangeText={(firstName) => this.setState({firstName})} 
                                    value={this.state.firstName}/>
                            </Item>
                            <Item>
                                <Input placeholder="Last Name" maxLength={20} 
                                    onChangeText={(lastName) => this.setState({lastName})}
                                    value={this.state.lastName}/>
                            </Item>
                            <Item>
                                <Input placeholder="Email (.edu)" maxLength={30} 
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}/>
                            </Item>
                            <Picker
                                iosHeader="School"
                                mode="dropdown"
                                selectedValue = { this.state.school }
                                onValueChange = { this.onValueChange.bind(this) }
                                >
                                <Picker.Item label="Select School" value="none" />
                                <Picker.Item label="Indiana University" value="indiana-university" />
                                <Picker.Item label="Purdue University" value="purdue-university" />
                                <Picker.Item label="Other" value="other" />
                            </Picker>
                            <Item>
                                <Input placeholder="Password (min. 8 chars)" secureTextEntry = { true } maxLength={30}
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}/>
                            </Item>
                            <Item>
                                <Input placeholder="Confirm password" secureTextEntry = { true } maxLength={30}
                                    onChangeText={(confirmedPassword) => this.setState({confirmedPassword})}
                                    value={this.state.confirmedPassword}/>
                            </Item>
                            <Item>
                                <Input placeholder="Username (min. 3 chars)" maxLength={20}
                                    onChangeText={(username) => this.setState({username})}
                                    value={this.state.username}/>
                            </Item>
                            <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.validate()}>
                                <Text>
                                    Signup
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
                                Clicking Signup indicates you agree to&nbsp;
                                <Text style={{color: 'blue'}}
                                    onPress={() => Linking.openURL('http://google.com')}>
                                    terms and conditions
                                </Text>
                            </Text>
                        </View>
                        
                        <View>
                            <Text>
                                See&nbsp;
                                <Text style={{color: 'blue'}}
                                    onPress={() => Linking.openURL('http://google.com')}>
                                    helpful information
                                </Text>
                                &nbsp;about using thumb
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}