import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import Config from 'react-native-config';
import { Container, Header, Content, Text, Body, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoUpload from 'react-native-photo-upload';

const initialState = {
    avatar: '',
    validationResponse: '',
    isSuccessful: false,
};

export default class AddProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    uploadProfilePicture(avatar) {
        fetch(Config.API_URL+'/user/pic', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "profile_picture" : avatar
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.setState({
                isSuccessful: true
            });
        })
        .catch( () => this.setState({ validationResponse: "Error: Cannot save the user profile picture."}) )
    }

    render() {
        if (this.state.isSuccessful) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                Profile picture successfully saved.
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
                        <PhotoUpload
                            onPhotoSelect={ _avatar => {
                                if (_avatar) {
                                    this.setState({
                                        avatar: _avatar
                                    });
                                    this.uploadProfilePicture(_avatar);
                                }
                            }}
                            >
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 150,
                                    height: 150,
                                    borderRadius: 75
                                }}
                                resizeMode='cover'
                                source={{
                                    uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                }}
                            />
                        </PhotoUpload>

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