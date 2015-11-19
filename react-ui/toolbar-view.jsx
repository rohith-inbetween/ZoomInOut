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
    if(clickedFrame){
      myStore.removeFrame(clickedFrame.id);
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
    return (
        <div className="toolbar-container" >
            <div className="createFrame toolbar-content" onClick={this.handleCreate} >Create</div>
            <div className="removeChild toolbar-content" onClick={this.handleRemoveChild}>Remove</div>
            <div className="indentRight toolbar-content" onClick={this.handleIndentRight}>IndentRight</div>
            <div className="indentLeft toolbar-content" onClick={this.handleIndentLeft}>IndentLeft</div>
            <div className="makeChild toolbar-content" onClick={this.handleMakeChild}>CreateChild</div>

        </div>
    );

  }

});

module.exports = Toolbar;