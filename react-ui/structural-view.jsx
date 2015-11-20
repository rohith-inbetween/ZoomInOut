var EditablePaperElementView = require("./editable-paper-element-view.jsx");
var ToolbarView = require("./toolbar-view.jsx");
var _ = require('lodash');
var myStore = require('./application-store');

var React = require('react');

var StructuralView = React.createClass({

  componentDidMount: function () {
    this.attachEventAfterUpdate();
  },

  componentDidUpdate: function () {
    this.attachEventAfterUpdate();
  },

  handleDocumentClick: function (oEvent) {
    var that = this;
    if (!(_.includes(oEvent.target.classList, 'removeChild')) && !oEvent.ctrlKey) {
      console.log("You clicked");
      myStore.enableAllClickAndMakeClickFrameArrayNull();
      //document.removeEventListener("click", that.handleDocumentClick);
    }
    //

  },

  attachEventAfterUpdate: function () {
    var that = this;
    document.addEventListener("click", that.handleDocumentClick);
  },


  render: function () {
    var aFrameData = this.props.frameData;
    var aFrameElements = [];
    for(var i = 0 ; i < aFrameData.length ; i++){
      aFrameElements.push(
          <EditablePaperElementView frameData={aFrameData[i]}/>
      );
    }
    return (
        <div className="structural-view">
          <div className="editor-header">Structural Editor</div>
          <ToolbarView frameData={aFrameData} />
          <div className="structural-view-elements">
            {aFrameElements}
          </div>
        </div>
    )
  }
});

module.exports = StructuralView;