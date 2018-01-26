import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

const initialState = {
    imageUrl: 'test'
};

export default class AddProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }

    render() {
        return (
            <Container>
                <Content style = { { padding: 20 } }>
                    {/*<Card style = { { padding: 20 } }>
                        
                        <CardItem header style = { { alignSelf: 'center' } }>
                            <Icon name="user" size={100} />
                        </CardItem>
                        
                        <CardItem>
                            <Body>
                                <Text style = { { textAlign: 'center' } }>
                                    This helps your fellow riders and drivers recognize
                                    you when you meet. Make sure your photo clearly shows
                                    your face and doesn't include any personal or sensitive
                                    info you'd rather not have others see.
                                </Text>
                            </Body>
                        </CardItem>
                        
                        <CardItem footer style = { { alignSelf: 'center' } }>
                            <Button bordered dark>
                                <Text>
                                    Upload Photo
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>*/}
                    <View style={styles.container}>
                        <Camera
                            ref={(cam) => {
                                this.camera = cam;
                            }}
                            style={styles.preview}
                            aspect={Camera.constants.Aspect.stretch}
                            CaptureTarget={Camera.constants.CaptureTarget.disk}
                        >
                            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
                                [CAPTURE]
                            </Text>
                        </Camera>
                        <Text>
                            {this.path || this.state.imageUrl}
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}