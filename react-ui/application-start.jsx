/**
 * Created by DEV on 30-06-2015.
 */
var React = require('react');
var AppController = require('./application-controller.jsx');
var mockData = require("./mockData").visualAttr;

React.render(<AppController data={mockData} />, document.querySelector('body'));