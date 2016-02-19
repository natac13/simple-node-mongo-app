'use strict';
import '../css/main.css';
import { ready, request } from '../common/ajax-functions';

import axios from 'axios';

(function () {
  const addButton = document.querySelector('.btn-add');
  const deleteButton = document.querySelector('.btn-delete');
  const clicksDisplay = document.querySelector('.click-amount');
  const apiUrl = 'http://localhost:3300/api/:id/clicks';

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
