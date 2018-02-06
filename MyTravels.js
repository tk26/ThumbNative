import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, View, Text, List, ListItem } from 'native-base';
import Config from 'react-native-config';

const initialState = {
    userPublicId: 0, rides: [], drives: []
}

export default class MyTravels extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    getUserRides() {
        fetch(Config.API_URL +
            '/ride/user/' + this.state.userPublicId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({
                rides : response
            });
        })
        .catch( () => {} );
    }

    getUserDrives() {
        fetch(Config.API_URL +
            '/drive/user/' + this.state.userPublicId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({
                drives : response
            });
        })
        .catch( () => {} );
    }

    componentDidMount() {
        AsyncStorage.getItem("user_public_id")
            .then(res => {
                if(res !== null) {
                    this.setState({
                        userPublicId: JSON.parse(res)
                    });
                }
            })
            .then(() => {
                this.getUserRides();
                this.getUserDrives();
            });
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.rides.length > 0 ?
                        <View>
                            <Text>
                                Rides
                            </Text>
                            <List dataArray={this.state.rides}
                                renderRow={(ride) =>
                                    <ListItem>
                                        <Text>
                                            From: {ride.rideFrom}
                                            {'\n'}
                                            To: {ride.rideTo}
                                            {'\n'}
                                            On: {ride.rideDate}
                                            {'\n'}
                                            When: {ride.rideTime.map(time=> {return time})}
                                        </Text>
                                    </ListItem>
                                }>
                            </List>
                        </View>
                    : null }
                    
                    {this.state.drives.length > 0 ?
                        <View>
                            <Text>
                                Drives
                            </Text>
                            <List dataArray={this.state.drives}
                                renderRow={(drive) =>
                                    <ListItem>
                                        <Text>
                                            From: {drive.driveFrom}
                                            {'\n'}
                                            To: {drive.driveTo}
                                            {'\n'}
                                            On: {drive.driveDate}
                                            {'\n'}
                                            When: {drive.driveTime.map(time=> {return time})}
                                            {'\n'}
                                            Seats Available: {drive.driveSeatsAvailable}
                                        </Text>
                                    </ListItem>
                                }>
                            </List>
                        </View>
                    : null }
                </Content>
            </Container>
        );
    }
};