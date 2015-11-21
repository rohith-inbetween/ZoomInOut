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
    myStore.collapseExpandAll("ExpandContent");
    myStore.triggerChange();
  },

  render: function(){
    return (
        <div className="toolbar-container">
            <div className="collapseAll toolbar-content" title="Collapse All" onClick={this.handleCollapseAll}></div>
            <div className="expandAll toolbar-content" title="Expand All" onClick={this.handleExpandAll}></div>
            <div className="expandContents toolbar-content" title="Expand Contents" onClick={this.handleExpandContents}></div>
        </div>
    );
  }

});

module.exports = DesignToolBar;