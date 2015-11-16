var myStore = require("./application-store");
var React = require('react');

var AppView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  keyDown: function(e){
    var frameID;
    if(e.keyCode == 13){
      e.preventDefault();
      frameID = this.props.frameData.id;
      myStore.createNewFrame(e.target.textContent, frameID);
    }
    else if(e.keyCode == 8){
      e.preventDefault();
      frameID = this.props.frameData.id;
    }
    else if(e.keyCode == 9){

    }
  },

  render: function(){
    var oFrameData = this.props.frameData;

    return(
      <div className="frameElement" contentEditable={true} onKeyDown={this.keyDown}>
              {oFrameData.title}
      </div>
    );
  }
});

module.exports = AppView;