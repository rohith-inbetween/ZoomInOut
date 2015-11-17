var React = require('react');
var myStore = require('./application-store');

var EditableDeignView = React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  mouseEnter: function(oEvent){
    oEvent.target.classList.add('hovered');
    oEvent.stopPropagation();
  },

  mouseLeave: function(oEvent){
    oEvent.target.classList.remove('hovered');
    oEvent.stopPropagation();
  },

  handleOnClick: function(oEvent){
    var frameID = this.props.frameData.id;
    myStore.setClass(frameID);
    oEvent.stopPropagation();
  },

  componentDidUpdate: function(){
    var oFrame = this.props.frameData;
    var oDesignElementDOM = this.getDOMNode();
    if(oFrame.id == myStore.getZoomedInFrameId()){
      oDesignElementDOM.classList.add('zoomed-in');
    } else {
      oDesignElementDOM.classList.remove('zoomed-in');
    }
  },

  render : function(){

    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditableDeignView frameData={oChildFrameData}/>
      );
    }

    return (
        <div className="design-element"
          onClick={this.handleOnClick}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}>
          <div id={oFrameData.id}
            className="design-element-title"
            ref="designTitleDiv"
            data-uuid={oFrameData.id}>
              {oFrameData.title}
            <div className="container-children">
            {aContainerContents}
            </div>
          </div>
        </div>
    );

  }





});

module.exports = EditableDeignView ;