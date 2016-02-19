'use strict';

import axios from 'axios';

const appUrl = window.location.origin;

export const ready = (fn) => {
  if (typeof fn !== 'function') {
    return;
  }

  if (document.readyState === 'complete') {
    return fn();
  }

  document.addEventListener('DOMContentLoaded', fn, false)
};
export const request = (method, url, callback) => {

  return axios[method](url)
    .then((result) => {
      console.log(result.data);
      if (callback) callback(result.data);
    })
}
