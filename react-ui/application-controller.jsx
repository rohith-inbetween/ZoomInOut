var React = require('react');

var StructuralView = require("./structural-view.jsx");
var DesignerView = require("./designer-view.jsx");
var myStore = require("./application-store");


var ApplicationController = React.createClass({

  //@UnBind: store with state
  componentWillUnmount: function () {
    myStore.unbind('change', this.storyStateChanged);
  },

  //@Bind: Store with state
  componentDidMount: function () {
    myStore.bind('change', this.storyStateChanged);
    myStore.initialize();
  },

  storyStateChanged: function () {
    this.setState({
      data: myStore.getFrameData()
    });
  },

  render: function () {
    var aFrames = this.props.data;
    return (
        <div className="editor">

          <StructuralView frameData={aFrames}/>
          <DesignerView frameData={aFrames}/>
        </div>
    )
  }
});

module.exports = ApplicationController;