/**
 * # Backend.js
 *
 * Abstract Base class for Backend support
 *
 */
'use strict';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from '../config/config';
import _ from 'underscore';

export default class Backend {
  /**
   * ## Constructor
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor( token) {
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "user", email: "user@livhea.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, {createdAt: "2016-05-30T15:29:36.611Z"
   *  objectId: "C3yyK420eA"
   *  sessionToken: "nsgx64nfgsk034Fjdsu4hd"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup(data) {

  }
 /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "user", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2016-05-30T15:29:36.611Z"
   *  email: "user@livhea.com"
   *  objectId: "C3yyK420eA"
   *  sessionToken: "nsgx64nfgsk034Fjdsu4hd"
   *  updatedAt: "2016-05-30T15:29:36.611Z"
   *  username: "user"
   *
   */
  async login(data) {

  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout() {

  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "user@livhea.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword(data) {

  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2016-05-30T15:29:36.611Z"
   *  email: "user@livhea.com"
   *  objectId: "C3yyK420eA"
   *  sessionToken: "nsgx64nfgsk034Fjdsu4hd"
   *  updatedAt: "2016-05-30T15:29:36.611Z"
   *  username: "user"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile() {
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId
   * @param data object:
   * {username: "barton", email: "user@livhea.com"}
   */
  async updateProfile(userId,data) {
  }

};
