import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import Profile from './Profile';

import ProfileProgress from './ProfileProgress';

import AddProfilePicture from './AddProfilePicture';
import AddPaymentMethod from './AddPaymentMethod';
import DescribeYourself from './DescribeYourself';

import Login from './Login';
import Signup from './Signup';

import Travel from './Travel';
import NewRide from './NewRide';
import NewDrive from './NewDrive';
import MyTravels from './MyTravels';

export const SignedOutStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Log in'
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            title: 'Sign up'
        }
    },
});

export const ProfileProgressStack = StackNavigator({
    ProfileProgress: {
        screen: ProfileProgress,
        navigationOptions: {
            title: 'Profile Progress',
        }
    },
    // all the screens accessible from ProfileProgress
    AddProfilePicture: {
        screen: AddProfilePicture,
        navigationOptions: {
            title: 'Add a profile picture',
        },
    },
    AddPaymentMethod: {
        screen: AddPaymentMethod,
        navigationOptions: {
            title: 'Add a payment method',
        },
    },
    DescribeYourself: {
        screen: DescribeYourself,
        navigationOptions: {
            title: 'Describe Yourself',
        },
    },
}, {
    headerMode: 'none'
});

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
        }
    },
    ProfileProgress: {
        screen: ProfileProgressStack
    }
});

export const TravelStack = StackNavigator({
    Travel: {
        screen: Travel,
        navigationOptions: {
            title: 'Travel',
        }
    },
    NewRide: {
        screen: NewRide,
        navigationOptions: {
            title: 'Submit ride request',
        }
    },
    NewDrive: {
        screen: NewDrive,
        navigationOptions: {
            title: 'Post a drive',
        }
    },
    MyTravels: {
        screen: MyTravels,
        navigationOptions: {
            title: 'My travels',
        }
    }
});

export const SignedInTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor}/>
        }
    },
    Travel: {
        screen: TravelStack,
        navigationOptions: {
            tabBarLabel: 'Travel',
            tabBarIcon: ({ tintColor }) => <Icon name="car" size={35} color={tintColor}/>
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => <Icon name="user" size={35} color={tintColor}/>
        }
    }
});

export const createRootNavigator = ( signedIn = false) => {
    return StackNavigator({
        SignedInTabs: {
            screen: SignedInTabs,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        SignedOutStack: {
            screen: SignedOutStack,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: signedIn ? 'SignedInTabs' : 'SignedOutStack'
    });
};