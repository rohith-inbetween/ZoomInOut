var React = require('react');
var EditableDeignView = require('./editable-design-view.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ContentEditDesignView = require('./../view/ContentEditView.jsx');

var DesignerView = React.createClass({

  flatStructure : {},

  setFrame: function(frame){
    this.flatStructure[frame.id] = frame;
    if(frame.contents.length>0){
      for(var i=0; i < frame.contents.length; i++){
        this.setFrame(frame.contents[i]);
      }
    }
  },

  render: function () {
   /* var aFrameElements = [];
    var aFrameData = this.props.frameData;

    for ( var i = 0 ; i < aFrameData.length; i++){*/

    var aFrameElements = [];
    var aFrameData = this.props.frameData;
    //this.setFrame()

    var propStore = this.props.store;
    var oFlatStructure = propStore.getFlatStructure();
    var keyList = Object.keys(oFlatStructure);
    for ( var i = 0 ; i < keyList.length; i++){
      var frame = oFlatStructure[keyList[i]];
      aFrameElements.push(
          <ContentEditDesignView frameData ={frame} />
      );
    } // <EditableDeignView frameData ={aFrameData[i]} />

    return (
        <div className="designer-view ">
          <div className="editor-header">Designer</div>
          <div id="design-view-element-container" className="design-view-elements">
            <ReactCSSTransitionGroup transitionName="design-element-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {aFrameElements}
            </ReactCSSTransitionGroup>
          </div>
        </div>
    )
  }
});

module.exports = DesignerView;