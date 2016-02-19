'use strict';

import { ready, request } from '../common/ajax-functions';
import '../css/userMain.css';
(function () {
  const profileId = document.querySelector('#profile-id') || null;
  const profileUsername = document.querySelector('#profile-username') || null;
  const profileRepos = document.querySelector('#profile-repos') || null;
  const displayName = document.querySelector('#display-name');
  const apiUrl = 'http://127.0.0.1:3300/api/:id';

  function updateHtmlElement (data, element, userProperty) {
    element.innerHTML = data[userProperty];
  }

  ready(request('get', apiUrl, function(data) {

    updateHtmlElement(data, displayName, 'displayName');

    if (profileId) {
      updateHtmlElement(data, profileId, 'id');
    }

    if (profileUsername) {
      updateHtmlElement(data, profileUsername, 'username');
    }

    if ( profileRepos) {
      updateHtmlElement(data, profileRepos, 'publicRepos');
    }
  }))
})();
