/**
 * Created by DEV on 30-06-2015.
 */
var React = require('react');
var AppController = require('./app-controller.jsx');
var mockData = require("./mockData");

React.render(<AppController data={mockData} />, document.querySelector('body'));