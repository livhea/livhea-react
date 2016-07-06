/**
* @providesModule LivHeaApp
* @flow
*/

'use strict';

var React = require('react');
var AppState = require('AppState');
var LoginScreen = require('./login/LoginScreen');
var StyleSheet = require('StyleSheet');
var LHNavigator = require('LHNavigator');
var CodePush = require('react-native-code-push');
var View = require('View');
var StatusBar = require('StatusBar');
var {
 loadNotifications,
} = require('./actions');
var { connect } = require('react-redux');

var { version } = require('./framework/env.js');

import { Text } from 'react-native';

class LivHeaApp extends React.Component{

 componentDidMount() {
   AppState.addEventListener('change', this.handleAppStateChange);
   CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
 }

 componentWillUnmount() {
   AppState.removeEventListener('change', this.handleAppStateChange);
 }

 handleAppStateChange(appState) {
   if (appState === 'active') {
     CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
   }
 }

 render() {
   if (this.props.isLoggedIn) {
     return <LoginScreen />;
    //  return <Text>Not Logged In</Text>;
   }
   return (
     <View style={styles.container}>
       <StatusBar
         translucent={true}
         backgroundColor="rgba(0, 0, 0, 0.2)"
         barStyle="light-content"
        />
       <LHNavigator />
     </View>
   );
 }

}

var styles = StyleSheet.create({
 container: {
   flex: 1,
 },
});

function select(store) {
 return {
   isLoggedIn: store.user.isLoggedIn,
 };
}

module.exports = connect(select)(LivHeaApp);
