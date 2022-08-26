const React = require('react');
const FormsView = require('../pages/forms/view');
const hydrate = require('nordic/hydrate');
 
const { } = window.__PRELOADED_STATE__;

hydrate(
  <FormsView/>,
  document.getElementById('root-app')
);