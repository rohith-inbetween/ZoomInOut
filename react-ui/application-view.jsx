var myStore = require("./application-store");
var React = require('react');

var AppView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  keyDown: function(e){
    var frameID = this.props.frameData.id;
    if(e.keyCode == 13){
      e.preventDefault();
      myStore.createNewFrame(e.target.textContent, frameID);
    }
    else if(e.keyCode == 8){
      if(e.target.textContent.length == 0){
        e.preventDefault();
        frameID = this.props.frameData.id;
        myStore.removeFrame(frameID);
      }

    }
    else if(e.keyCode == 9){
      e.preventDefault();
      myStore.makeParentContainerAndAddToParent(frameID);
    }
  },

  render: function(){
    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <AppView frameData={oChildFrameData}/>
      );
    }
    return(
      <div className="frameElement">
        <div className="titleDiv" contentEditable={true} onKeyDown={this.keyDown}>{oFrameData.title}</div>
        <div className="containerContents">
          {aContainerContents}
        </div>
      </div>
    );
  }
});

module.exports = AppView;