/**
 * # BackendFactory.js
 *
 *
 */
'use strict';

import CONFIG from '../config/config';
import Hapi from './MEAN';

export default function BackendFactory(token = null) {
  if (CONFIG.backend.mean) {
    return new MEAN(token);
  }
}
