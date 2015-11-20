var React  = require('react');
var myStore = require('./application-store');


var Toolbar = React.createClass({

  handleCreate: function(e){

    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.createNewFrame(clickedFrame.title , clickedFrame.id);
    }else{
      alert("Please focus a frame");
    }

  },

  handleRemoveChild: function(){
    var clickedFrame = myStore.getClickedFrame();
    var clickedFrameArray = myStore.getClickedFrameArray();
    if(clickedFrame && clickedFrameArray.length==0){
      myStore.removeFrame(clickedFrame.id);
    }else if(clickedFrameArray){
      myStore.removeFrame(clickedFrameArray, true);
    }else{
      alert("Please focus a frame");
    }
  },

  handleIndentRight: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.changeParentToContainerAndAddToParent(clickedFrame.title , clickedFrame.id);
    }else{
      alert("Please focus a frame");
    }
  },

  handleIndentLeft: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.makeParentAndAddSiblingsToChildren(clickedFrame.title, clickedFrame.id);
    }else{
      alert("Please focus a frame");
    }
  },

  handleMakeChild: function(){
    var clickedFrame = myStore.getClickedFrame();
    if(clickedFrame){
      myStore.createNewFrame(clickedFrame.title , clickedFrame.id);
      var newFrame = myStore.getNewFrame();
      myStore.changeParentToContainerAndAddToParent(newFrame.title , newFrame.id);
    }else{
      alert("Please focus a frame");
    }
  },

  render:function(){
    var aClickedFrames = myStore.getClickedFrameArray();
    var createFrame = "createFrame toolbar-content";
    var removeChild = "removeChild toolbar-content";
    var indentRight = "indentRight toolbar-content";
    var indentLeft = "indentLeft toolbar-content";
    var makeChild = "makeChild toolbar-content";

    if(aClickedFrames && aClickedFrames.length>0){
      createFrame += ' disable-click';
      indentRight += ' disable-click';
      indentLeft += ' disable-click';
      makeChild += ' disable-click';

    }

    return (
        <div className="toolbar-container" >
            <div className={createFrame} onClick={this.handleCreate} >Create</div>
            <div className={removeChild} onClick={this.handleRemoveChild}>Remove</div>
            <div className={indentRight} onClick={this.handleIndentRight}>IndentRight</div>
            <div className={indentLeft}  onClick={this.handleIndentLeft}>IndentLeft</div>
            <div className={makeChild} onClick={this.handleMakeChild}>CreateChild</div>
        </div>
    );

  }

});

module.exports = Toolbar;