var React = require('react');
var EditableDeignView = require('./editable-design-view.jsx');


var DesignerView = React.createClass({
  render: function () {
    var aFrameElements = [];
    var aFrameData = this.props.frameData;
    for ( var i = 0 ; i < aFrameData.length; i++){
      aFrameElements.push(
          <EditableDeignView frameData ={aFrameData[i]} />
      );
    }

    return (
        <div className="designer-view">
          <div className="editor-header">Designer</div>
          <div className="design-view-elements">
            {aFrameElements}
          </div>
        </div>
    )
  }
});

module.exports = DesignerView;