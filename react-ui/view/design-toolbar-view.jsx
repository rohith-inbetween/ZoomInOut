var React = require('react');
var myStore = require('../application-store');

var DesignToolBar = React.createClass({

  handleCollapseAll: function(){
    myStore.collapseExpandAll("Collapse");
    myStore.triggerChange();

  },

  handleExpandAll: function(){
    myStore.collapseExpandAll("Expand");
    myStore.triggerChange();
  },

  handleExpandContents: function(){

  },

  render: function(){
    return (
        <div className="toolbar-container">
            <div className="collapseAll toolbar-content" onClick={this.handleCollapseAll}>collapseAll</div>
            <div className="expandAll toolbar-content" onClick={this.handleExpandAll}>expandAll</div>
            <div className="expandContents toolbar-content" onClick={this.handleExpandContents}>expandAll</div>
        </div>
    );
  }

});

module.exports = DesignToolBar;