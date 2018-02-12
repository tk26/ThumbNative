import React, { Component } from 'react';
import { Container, Content, View, Text, Button, List, ListItem, CheckBox, Body, Item } from 'native-base';
import { FlatList } from 'react-native';

var Contacts = require('react-native-contacts')

const initialState = {
    contacts: [],
    selectedChecklist: []
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

    sendInvites() {
        alert(JSON.stringify(this.state.selectedChecklist));
    }

    render() {
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
                                        <Text>{item.name}</Text>
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
                </Content>
            </Container>
        );
    }
}