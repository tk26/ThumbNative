import React, { Component } from 'react';
import { Image, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Text, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
    hasPaymentInformation: false,
    hasProfilePicture: false,
    hasBio: false
}

export default class ProfileProgress extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        AsyncStorage.getItem("hasPaymentInformation")
            .then(res => {
                if(res !== null) {
                    this.setState({
                        hasPaymentInformation: res === "true" ? true : false
                    });
                }
            });

        AsyncStorage.getItem("hasProfilePicture")
            .then(res => {
                if(res !== null) {
                    this.setState({
                        hasProfilePicture: res  === "true" ? true : false
                    });
                }
            });

        AsyncStorage.getItem("hasBio")
            .then(res => {
                if(res !== null) {
                    this.setState({
                        hasBio: res === "true" ? true : false
                    });
                }
            });
    }

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
                                { this.state.hasProfilePicture ?
                                    <Icon name="check-circle" size={18}/>
                                    : <Icon name="picture-o" size={18}/> }
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text onPress={() => navigate('AddPaymentMethod')}>
                                    Add a payment method
                                </Text>
                            </Left>
                            <Right>
                                { this.state.hasPaymentInformation ?
                                    <Icon name="check-circle" size={18}/>
                                    : <Icon name="credit-card" size={18}/> }
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Text onPress={() => navigate('DescribeYourself')}>
                                    Describe yourself
                                </Text>
                            </Left>
                            <Right>
                                { this.state.hasBio ?
                                    <Icon name="check-circle" size={18}/>
                                    : <Icon name="pencil-square-o" size={18}/> }
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