import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './Home';
import Profile from './Profile';

import ProfileProgress from './ProfileProgress';

import AddProfilePicture from './AddProfilePicture';
import AddPaymentMethod from './AddPaymentMethod';
import DescribeYourself from './DescribeYourself';

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

export const Tabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor}/>
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