var React  = require('react');
var myStore = require('./../application-store');


var Toolbar = React.createClass({

  handleCreate: function(e){

    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.createNewFrame(clickedFrame.title , clickedFrame.id);
    }

  },

  handleRemoveChild: function(){
    var clickedFrame = myStore.getClickedFrame();
    var clickedFrameArray = myStore.getClickedFrameArray();
    if(clickedFrame && clickedFrameArray.length==0){
      myStore.removeFrame(clickedFrame.id);
    }else if(clickedFrameArray){
      myStore.removeFrame(clickedFrameArray, true);
    }
  },

  handleIndentRight: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.changeParentToContainerAndAddToParent(clickedFrame.title , clickedFrame.id);
    }
  },

  handleIndentLeft: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.makeParentAndAddSiblingsToChildren(clickedFrame.title, clickedFrame.id);
    }
  },

  handleMakeChild: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.createNewFrame(clickedFrame.title , clickedFrame.id);
      var newFrame = myStore.getNewFrame();
      myStore.changeParentToContainerAndAddToParent(newFrame.title , newFrame.id);
    }
  },

  expandAll: function(){
    myStore.expandCollapseAllTreeView('expanded');
  },

  collapseAll: function(){
    myStore.expandCollapseAllTreeView('collapsed');
  },

  render:function(){
    var aClickedFrames = myStore.getClickedFrameArray();
    var createFrame = "createFrame toolbar-content my-context-menu";
    var removeChild = "removeChild toolbar-content";
    var indentRight = "indentRight toolbar-content";
    var indentLeft = "indentLeft toolbar-content";
    var makeChild = "makeChild toolbar-content";
    var expandAll = "expandAll toolbar-content";
    var collapseAll = "collapseAll toolbar-content";

    if(aClickedFrames && aClickedFrames.length>0){
      createFrame += ' disable-click';
      indentRight += ' disable-click';
      indentLeft += ' disable-click';
      makeChild += ' disable-click';
    }
    return (
        <div className="toolbar-container" >
          <div className={collapseAll} title="Collapse All" onClick={this.collapseAll} ></div>
          <div className={expandAll} title="Expand All" onClick={this.expandAll} ></div>
          <div className={createFrame} title="Create New"></div>
          <div className={removeChild} title="Remove" onClick={this.handleRemoveChild}></div>
          <div className={makeChild} title="Create Child" onClick={this.handleMakeChild}></div>
          <div className={indentRight} title="Indent Right" onClick={this.handleIndentRight}></div>
          <div className={indentLeft} title="Indent Left" onClick={this.handleIndentLeft}></div>
        </div>
    );


  }

});

module.exports = Toolbar;