import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Config from 'react-native-config';
import { Container, Content, View, Text, Picker, Item, Button } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const initialState = { 
    from_location: '', to_location: '', travel_date: '',
    travel_time: 'none', comment: '',
    validationResponse: '', isSuccessful: false
};

export default class NewRide extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(value) {
        this.setState({
            travel_time: value
        });
    }

    validate() {
        this.setState({ validationResponse: "" })
        if(!this.state.from_location
            || !this.state.to_location
            || !this.state.travel_date
            || this.state.travel_time === 'none'
            ) 
            {   
                this.setState({ validationResponse: "Error: One or more invalid fields."} );
            }
        else {
            this.submitRide();
        }
    }

    submitRide() {
        fetch(Config.API_URL+'/ride/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : global.auth_token,
                "from_location" : this.state.from_location,
                "to_location" : this.state.to_location,
                "travel_date" : this.state.travel_date,
                "travel_time": [ this.state.travel_time ],
                "comment": this.state.comment
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState(initialState);
            this.setState({
                isSuccessful: true
            });
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
        
        if (this.state.isSuccessful) {
            return (
                <Container>
                    <Content>
                        <View>
                            <Text> 
                                New Ride successfully submitted.
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
                        <Text> From </Text>
                        <GooglePlacesAutocomplete
                            minLength={3} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                this.setState({ from_location: data.description});
                            }}
                            
                            getDefaultValue={() => ''}
                            
                            query={{
                                key: 'AIzaSyBM4s2TPgaBA9JMCMMZv_VlRGdTTkucQEU',
                                language: 'en', // language of the results
                                types: 'address' // default: 'geocode'
                            }}
                            
                            styles={{
                                textInputContainer: {
                                width: '100%'
                                },
                                description: {
                                fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                color: '#1faadb'
                                }
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                        />
                        
                        <Text> To </Text>
                        <GooglePlacesAutocomplete
                            minLength={3} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                this.setState({ to_location: data.description});
                            }}
                            
                            getDefaultValue={() => ''}
                            
                            query={{
                                key: 'AIzaSyBM4s2TPgaBA9JMCMMZv_VlRGdTTkucQEU',
                                language: 'en', // language of the results
                                types: 'address' // default: 'geocode'
                            }}
                            
                            styles={{
                                textInputContainer: {
                                width: '100%'
                                },
                                description: {
                                fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                color: '#1faadb'
                                }
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                        />
                        
                        <Text> Travel Date </Text>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.travel_date}
                            mode="date"
                            placeholder="select date"
                            format="MM-DD-YYYY"
                            minDate={moment()}
                            maxDate={moment().add(100, 'd')}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {this.setState({travel_date: date})}}
                        />
                        
                        <Picker
                            iosHeader="Travel Time"
                            mode="dropdown"
                            selectedValue = { this.state.travel_time }
                            onValueChange = { this.onValueChange.bind(this) }
                            >
                            <Picker.Item label="Select Time" value="none" />
                            <Picker.Item label="Open to all" value="open" />
                            <Picker.Item label="Morning" value="morning" />
                            <Picker.Item label="Noon" value="noon" />
                            <Picker.Item label="Evening" value="evening" />
                            <Picker.Item label="Night" value="night" />
                        </Picker>

                        <Text> Comments (if any) </Text>
                        <TextInput
                            placeholder="open to pitch in for gas..."
                            onChangeText={(comment) => this.setState({ comment })}
                            value={this.state.comment}
                            multiline={true} maxLength={200}
                        />

                        <Button rounded success style = { { alignSelf: 'center' } } onPress={() => this.validate()}>
                            <Text>
                                Submit
                            </Text>
                        </Button>

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
};