import React, { Component } from 'react';
import { Container, Content, View, Text, Button, List, ListItem } from 'native-base';

import { onSignOut } from './auth';

var Contacts = require('react-native-contacts')

const initialState = {
    contacts: []
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    triggerInviteUsers() {
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                // contacts returned in []
                this.setState({
                    contacts: contacts.map(contact => { return {
                        name: contact.givenName + " " + contact.familyName,
                        phoneNumber: contact.phoneNumbers[0].number
                    }})
                });
            }
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.props.navigation.navigate('ProfileProgress')}>
                        <Text>
                            Profile Progress
                        </Text>
                    </Button>

                    <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.triggerInviteUsers()}>
                        <Text>
                            Invite Users
                        </Text>
                    </Button>

                    <Button rounded info style = { { alignSelf: 'center' } } 
                        onPress={() => onSignOut().then(() => this.props.navigation.navigate('SignedOutStack'))}
                        >
                        <Text>
                            Log out
                        </Text>
                    </Button>
                </Content>

                { this.state.contacts.length > 0 ?
                    <View>
                        <Text>
                            Contacts
                        </Text>
                        <List dataArray={this.state.contacts}
                                renderRow={(contact) =>
                                    <ListItem>
                                        <Text>
                                            {contact.name}
                                            {'\n'}
                                            {contact.phoneNumber}
                                        </Text>
                                    </ListItem>
                                }>
                            </List>
                    </View>
                : null }
                
            </Container>
        );
    }
}