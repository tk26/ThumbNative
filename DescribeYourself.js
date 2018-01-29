import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Config from 'react-native-config';
import { Container, Content, View, Text, Card, CardItem, Button, Form, Input, Item } from 'native-base';

const initialState = {
    bio: '',
    validationResponse: '', 
    isSuccessful: false
}

export default class DescribeYourself extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        this.setState({ validationResponse: "" });
        if(!this.state.bio) {
                this.setState({ validationResponse: "Error: User bio cannot be empty" });
            }
        else {
            this.setState({ validationResponse: "Saving user bio..." });
            this.saveUserBio();
        }
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    saveUserBio() {
        fetch(Config.API_URL+'/user/bio', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "bio" : this.state.bio
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.setState({
                isSuccessful: true
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot save the user bio."}) )
    }

    render() {
        if (this.state.isSuccessful) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                Bio successfully saved.
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
                        <Card style = {{ padding: 20 }}>
                            <CardItem header style = { { alignSelf: 'center' } }>
                                <Text>
                                    Add a bio...
                                </Text>
                            </CardItem>

                        
                            <TextInput placeholder="about me..." multiline maxLength={400}
                                onChangeText={(bio) => this.setState({bio})} 
                                value={this.state.bio}/>
    
                            <CardItem footer style = { { alignSelf: 'center' } }>
                                <Button bordered dark onPress={() => this.validate()}>
                                    <Text>
                                        Save bio
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
    }
}