import React, { Component } from 'react';
import { Platform, Linking } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker, View } from 'native-base';

const initialState = { 
    firstName: '', lastName: '', email: '',
    school: 'none', password: '', confirmedPassword: '',
    validationResponse: ''
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
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(!this.state.firstName
            || !this.state.lastName
            || !this.state.email
            || this.state.school === 'none'
            || this.state.password.length < 8
            || this.state.password !== this.state.confirmedPassword
            || !reg.test(this.state.email.toLowerCase())
            // || this.state.email.substr(this.state.email.length-4) !== '.edu'
            ) 
            {   
                this.setState({ validationResponse: "Error: One or more invalid fields."} );
            }
        else {
            if(this.state.email.substr(this.state.email.length-4) === '.edu') {
                this.saveUser();
            }
            else {
                this.savePotentialUser();
                this.setState({ validationResponse: "Please use .edu email address to create an account."});
            }
        }
    }

    savePotentialUser() {
        fetch('https://vast-everglades-88283.herokuapp.com/user/potential/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email,
                "school" : this.state.school
            })
        })
        .then(this.handleErrors)
        .catch( (error) => {});
    }

    saveUser() {
        fetch('https://vast-everglades-88283.herokuapp.com/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email.toLowerCase(),
                "school" : this.state.school,
                "password" : this.state.password
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.props.navigation.navigate('SignupSuccess');
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot create an account."}) );
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
                            <Input placeholder="Email (.edu)" maxLength={40} 
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
                            <Picker.Item label="Indiana University" value="iu" />
                            <Picker.Item label="Purdue University" value="pu" />
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
                            Have an account already?&nbsp;
                            <Text style={{color: 'blue'}} onPress={() => navigate('Login')}>
                                Login
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

                    <Button rounded success style = { { alignSelf: 'center' } } onPress={() => navigate('ProfileProgress')}>
                            <Text>
                                Profile Progress
                            </Text>
                        </Button>
                </Content>
            </Container>
        );
    }
}