var myStore = require("./application-store");
var React = require('react');

var AppView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  keyDown: function(e){
    if(e.keyCode == 13){
      e.preventDefault();
      var frameID = this.props.frameData.id;
      myStore.createNewFrame(e.target.textContent, frameID);
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