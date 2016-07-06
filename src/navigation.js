'use strict';

import type {Action} from '../actions/types';

export type Tab =
    'feed'
  | 'chat'
  | 'profile'
  | 'notifications'
  | 'info'
  ;

type State = {
  tab: Tab;
};

const initialState: State = { tab: 'feed'};

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
