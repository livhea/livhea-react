'use strict';

export type Action =
    { type: 'LOADED_FEED', list: Array<Object> }
  | { type: 'LOADED_NOTIFICATIONS', list: Array<Object> }
  | { type: 'LOADED_CHAT', list: Array<Object> }
  | { type: 'LOADED_PROFILE', list: Object }
  | { type: 'LOGGED_IN', source: ?string; data: { id: string; name: string; pic: ?string; accessToken: ?string } }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOGGED_OUT' }
  | { type: 'SWITCH_TAB', tab: 'feed' | 'chat' | 'profile' | 'notifications' | 'info' }
  | { type: 'TURNED_ON_PUSH_NOTIFICATIONS' }
  | { type: 'REGISTERED_PUSH_NOTIFICATIONS' }
  | { type: 'SKIPPED_PUSH_NOTIFICATIONS' }
  | { type: 'RECEIVED_PUSH_NOTIFICATION', notification: Object }
  | { type: 'SEEN_ALL_NOTIFICATIONS' }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
