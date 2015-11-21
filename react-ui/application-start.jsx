/**
 * Created by DEV on 30-06-2015.
 */
var React = require('react');
var AppController = require('./application-controller.jsx');
var ApplicationStore = require("./application-store");

var aData = ApplicationStore.initialize();

React.render(<AppController data={aData} />, document.getElementById('rohith'));