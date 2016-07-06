'use strict';

import type {Action} from '../actions/types';

export type State = {
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  pic: ?string;
  id: ?string;
  name: ?string;
  accessToken: ?string;
};

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  pic: null,
  id: null,
  name: null,
  accessToken: null
};

function user(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    let {id, name, pic, accessToken} = action.data;
    if (sharedSchedule === undefined) {
      sharedSchedule = null;
    }
    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      pic,
      id,
      name,
      accessToken
    };
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = user;
