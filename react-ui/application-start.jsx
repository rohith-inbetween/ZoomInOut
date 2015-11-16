/**
 * Created by DEV on 30-06-2015.
 */
var React = require('react');
var ScrollElement = require('./ScrollElement.jsx').view;

React.render(<ScrollElement >
              <div className="child">I Am Children</div>
            </ScrollElement>, document.querySelector('body'));