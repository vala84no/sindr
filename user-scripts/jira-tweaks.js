// ==UserScript==
// @name         Jira Tweaks
// @namespace    http://tampermonkey.net/
// @version      2024-01-15
// @description  Jira improvements.
// @author       Vala
// @match        https://*.atlassian.net/jira/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @require      https://unpkg.com/rxjs@%5E7/dist/bundles/rxjs.umd.min.js
// @grant        none
// ==/UserScript==

function getMutations(selector = 'body', options = {}) {
  return Rx.DOM.fromMutationObserver(document.querySelector(selector), { 
    attributes: true, 
    childList: true, 
    characterData: true,
    ...options,
  });
}

(function() {
  'use strict';

  getMutations().subsribe(mutation => console.log('DEBUG: Mutation:', mutation);
})();
