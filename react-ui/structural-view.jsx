var EditablePaperElementView = require("./editable-paper-element-view.jsx");
var ToolbarView = require("./toolbar-view.jsx");

var React = require('react');

var StructuralView = React.createClass({

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