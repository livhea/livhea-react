/**
* # FormButton.js
*
* Display a button that responds to onPress and is colored appropriately
*/
'use strict';
/**
 * ## Imports
 *
 * React
 */
import  React, {Component} from 'react';
import
{
  StyleSheet,
  View
} from 'react-native';

/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button');

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 30,
    marginRight: 30
  },
  button: {
    backgroundColor: '#1AA770',
    borderColor:  '#1AA770'
  }

});

class FormButton extends Component{
  /**
   * ### render
   *
   * Display the Button
   */
  render() {
    return (
      <View style={styles.signin}>
        <Button style={styles.button}
            isDisabled={this.props.isDisabled}
            onPress={this.props.onPress}
        >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
}

module.exports = FormButton;
