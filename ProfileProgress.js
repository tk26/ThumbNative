import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileProgress extends Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <Content>
                    <Image
                        style = { 
                            { 
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height/4
                            }   
                        }
                        source = { require('./assets/travel_man.jpg') }
                    />
                    <List>
                        <ListItem>
                            <Left>
                                <Text>
                                    Signup
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="check-circle" size={18}/>
                            </Right>
                        </ListItem>
                        
                        <ListItem>
                            <Left>
                                <Text onPress={() => navigate('AddProfilePicture')}>
                                    Add a profile picture
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="picture-o" size={18}/>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text onPress={() => navigate('AddPaymentMethod')}>
                                    Add a payment method
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="credit-card" size={18}/>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text onPress={() => navigate('DescribeYourself')}>
                                    Describe yourself
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="pencil-square-o" size={18}/>
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text>
                                    Book your first trip
                                </Text>
                            </Left>
                            <Right>
                                <Icon name="car" size={18}/>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}