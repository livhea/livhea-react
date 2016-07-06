/**
* @flow
*/

'use strict';

import type { Action } from './types';

type Tab = 'feed' | 'chat' | 'profile' | 'notifications' | 'info';

module.exports = {
 switchTab: (tab: Tab): Action => ({
   type: 'SWITCH_TAB',
   tab,
 }),
};
