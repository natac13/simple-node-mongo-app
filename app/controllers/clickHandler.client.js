'use strict';
import '../css/main.css';
import { ready, request } from '../common/ajax-functions';

import axios from 'axios';

(function () {
  const addButton = document.querySelector('.btn-add');
  const deleteButton = document.querySelector('.btn-delete');
  const clicksDisplay = document.querySelector('.click-amount');
  const apiUrl = 'http://127.0.0.1:3300/api/:id/clicks';

  function ready(fn) {
    if (typeof fn !== 'funciton') return;

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  const request = (method, url, callback) => {

    return axios[method](url)
      .then((result) => {
        console.log(result.data);
        if (callback) callback(result.data);
      })
  }

  const updateClicks = (data) => {
    clicksDisplay.innerHTML = data.clicks;
  };

  ready(request('get', apiUrl, updateClicks));

  addButton.addEventListener('click', () => {
    request('post', apiUrl)
      .then(request('get', apiUrl, updateClicks));
  }, false);

  deleteButton.addEventListener('click', () => {
    request('delete', apiUrl)
      .then(request('get', apiUrl, updateClicks));
  }, false);

})();
