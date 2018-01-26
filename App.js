import React, { Component } from 'react';
import { SignedOutStack, SignedInTabs, createRootNavigator } from './router';
import { isSignedIn } from './auth';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          signedIn: false,
          checkedSignIn: false
        }
    }

    componentWillMount() {
        isSignedIn()
            .then( res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch( err => console.log(err) );
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return <Layout/>
    }
}