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

  handleViewChange: function(oEvent){
    document.getElementsByTagName('body')[0].className = oEvent.target.value;
    if(oEvent.target.value == "view2" ||
        oEvent.target.value == "view3" ||
        oEvent.target.value == "view4" ||
        oEvent.target.value == "view5"){
      $('.content-edit-element[data-uuid="1_1_1"]').show();
      $('.content-edit-element[data-uuid="1_1_1"]').find('.content-element-data, .content-data, .container-children').show();
    } else{
      $('.content-edit-element[data-uuid="1_1_1"]').find('.content-element-data, .content-data, .container-children').hide();
    }

    myStore.triggerChange();

  },

  render: function(){
    return (
        <div className="toolbar-container">
            <div className="collapseAll toolbar-content" title="Collapse All" onClick={this.handleCollapseAll}></div>
            <div className="expandAll toolbar-content" title="Expand All" onClick={this.handleExpandAll}></div>
            <div className="expandContents toolbar-content" title="Expand Contents" onClick={this.handleExpandContents}></div>
            <div className="viewChangeContainer">
                <span>View:</span>
                <select className="mySel" onChange={this.handleViewChange}>
                    <option value="view1">View 1</option>
                    <option value="view2">View 2</option>
                    <option value="view3">View 3</option>
                    <option value="view4">View 4</option>
                    <option value="view5">View 5</option>
                </select>
            </div>
        </div>
    );
  }

});

module.exports = DesignToolBar;