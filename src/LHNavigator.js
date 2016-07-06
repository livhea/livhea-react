/**
* @providesModule LHNavigator
* @flow
*/

'use strict';

var React = require('react');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var LHTabsView = require('LHTabsView');
var Navigator = require('Navigator');
var StyleSheet = require('StyleSheet');
var { connect } = require('react-redux');
var { switchTab } = require('./actions');

class LHNavigator extends React.Component {

  constructor(){
    super();
    this._handlers = ([]: Array<() => boolean>);
    return this;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return{
      addBackButtonListener: this.addBackButtonListener.bind(this),
      removeBackButtonListener: this.removeBackButtonListener.bind(this),
    };
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    
    if (this.props.tab !== 'feed') {
      this.props.dispatch(switchTab('feed'));
      return true;
    }
    return false;
  }

  render() {
    return (
      <Navigator
      ref="navigator"
      style={styles.container}
      configureScene={(route) => {
        if (Platform.OS === 'android') {
          return Navigator.SceneConfigs.FloatFromBottomAndroid;
        }
        // TODO: Proper scene support
        if (route.shareSettings || route.friend) {
          return Navigator.SceneConfigs.FloatFromRight;
        } else {
          return Navigator.SceneConfigs.FloatFromBottom;
        }
      }}
      initialRoute={{}}
      renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    if(route.allSessions){

    }

    return <LHTabsView navigator={navigator} />;
  }

}

LHNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

function select(store) {
  return {
    tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(LHNavigator);
