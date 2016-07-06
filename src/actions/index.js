'use strict';

const navigationActions = require('./navigation');
const loginActions = require('./login');
const notificationActions = require('./notifications');

module.exports = {
  ...loginActions,
  ...notificationActions,
  ...navigationActions,
};
