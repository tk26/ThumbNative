import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Config from 'react-native-config';
import { Container, Content, View, Text, Button, List, ListItem, CheckBox, Body, Item } from 'native-base';

var Contacts = require('react-native-contacts')

const initialState = {
    contacts: [],
    selectedChecklist: [],
    validationResponse: '',
    currentStep: 0,
}

export default class InviteUsers extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                // contacts returned in []
                this.setState({
                    contacts: contacts.map(contact => { return {
                        id: contact.recordID,
                        name: contact.givenName + " " + contact.familyName,
                        phoneNumber: contact.phoneNumbers[0].number,
                    }})
                });
            }
        });
    }

    onCheckBoxPress(id) {
        let tmp = this.state.selectedChecklist;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
        }

        this.setState({
            selectedChecklist: tmp
        });
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    sendInvites() {
        let selectedContacts = this.state.contacts
            .filter(contact => this.state.selectedChecklist.includes(contact.id))
            .map(_contact => {
                return {
                    phone: _contact.phoneNumber.replace(/\D+/g, "").slice(-10),
                    name: _contact.name,
                }
            });
        fetch(Config.API_URL+'/user/invite/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "contactsInvited" : selectedContacts,
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState({ 
                validationResponse: "Invitations sent out successfully!",
                currentStep: 1,
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot send out invitations" }) )
    }

    render() {
        if(this.state.currentStep === 0) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text>
                                Select one or more contacts and hit "Send"
                            </Text>
                            <Item>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={(item, index) => item.id}
                                    data={this.state.contacts}
                                    renderItem={({ item }) => {
                                        return <ListItem>
                                        <CheckBox
                                            checked={this.state.selectedChecklist.includes(item.id) ? true : false}
                                            onPress={() => this.onCheckBoxPress(item.id)}
                                        />
                                        <Body>
                                            <Text>
                                                {item.name}
                                                {'\n'}
                                                {item.phoneNumber}
                                            </Text>
                                        </Body>
                                        </ListItem>
                                    }}
                                />
                            </Item>
                            <Button rounded info onPress = { () => this.sendInvites() }>
                                <Text>
                                    Send
                                </Text>
                            </Button>
                        </View>

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
                                Invitations sent out successfully.
                            </Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}