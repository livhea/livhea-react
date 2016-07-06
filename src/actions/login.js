'use strict';

const FacebookSDK = require('../framework/FacebookSDK');
const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');
//const {updateInstallation} = require('./installation');

import type { Action, ThunkAction } from './types';

async function ParseFacebookLogin(scope): Promise {
  return new Promise((resolve, reject) => {
    // Parse.FacebookUtils.logIn(scope, {
    //   success: resolve,
    //   error: (user, error) => reject(error && error.error || error),
    // });
  });
}

async function queryFacebookAPI(path, ...args): Promise {
  return new Promise((resolve, reject) => {
    FacebookSDK.api(path, ...args, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    });
  });
}

async function _logInWithFacebook(source: ?string): Promise<Array<Action>> {
  //await ParseFacebookLogin('public_profile,email,user_friends');
  const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

  const user = await Parse.User.currentAsync();
  user.set('facebook_id', profile.id);
  user.set('name', profile.name);
  user.set('email', profile.email);
  user.set('pic', "");
  await user.save();
  await updateInstallation({user});

  const action = {
    type: 'LOGGED_IN',
    source,
    data: {
      id: profile.id,
      name: profile.name,
      pic: user.get('pic'),
      accessToken
    },
  };

  return Promise.all([
    Promise.resolve(action),
    restoreSchedule(),
  ]);
}

function logInWithFacebook(source: ?string): ThunkAction {
  return (dispatch) => {
    const login = _logInWithFacebook(source);

    login.then(
      (result) => {
        dispatch(result);
      }
    );
    return login;
  };
}

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

function logOut(): ThunkAction {
  return (dispatch) => {
    FacebookSDK.logout();

    // TODO: Make sure reducers clear their state
    return dispatch({
      type: 'LOGGED_OUT',
    });
  };
}

function logOutWithPrompt(): ThunkAction {
  return (dispatch, getState) => {
    let name = getState().user.name || 'there';

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Hi, ${name}`,
          options: ['Log out', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            dispatch(logOut());
          }
        }
      );
    } else {
      Alert.alert(
        `Hi, ${name}`,
        'Log out from LivHea?',
        [
          { text: 'Cancel' },
          { text: 'Log out', onPress: () => dispatch(logOut()) },
        ]
      );
    }
  };
}

module.exports = {logInWithFacebook, skipLogin, logOut, logOutWithPrompt};
