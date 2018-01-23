import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Signup from './Signup';
import ProfileProgress from './ProfileProgress';
import AddProfilePicture from './AddProfilePicture';
import AddPaymentMethod from './AddPaymentMethod';
import SignupSuccess from './SignupSuccess';
import Login from './Login';
import LoginSuccess from './LoginSuccess';
import ForgotPassword from './ForgotPassword';

const RootNavigator = StackNavigator({
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerTitle: 'Signup',
      },
    },
    ProfileProgress: {
      screen: ProfileProgress,
      navigationOptions: {
        headerTitle: 'Profile Progress',
      },
    },
    AddProfilePicture: {
      screen: AddProfilePicture,
      navigationOptions: {
        headerTitle: 'Add a profile picture',
      },
    },
    AddPaymentMethod: {
      screen: AddPaymentMethod,
      navigationOptions: {
        headerTitle: 'Add a payment method',
      },
    },
    SignupSuccess: {
      screen: SignupSuccess,
      navigationOptions: {
        headerTitle: 'Signup Successful',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login',
      },
    },
    LoginSuccess: {
      screen: LoginSuccess,
      navigationOptions: {
        headerTitle: 'Login Successful',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTitle: 'Forgot password',
      },
    },
});

export default class App extends Component {
    render() {
        return (
          <RootNavigator/>
        );
    }
}