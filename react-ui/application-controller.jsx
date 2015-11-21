var React = require('react');

var StructuralView = require("./view/structural-view.jsx");
var DesignerView = require("./view/designer-view.jsx");
var myStore = require("./application-store");

var ContentEditDesignView = require('./view/ContentEditView.jsx');

var ApplicationController = React.createClass({

  //@UnBind: store with state
  componentWillUnmount: function () {
    myStore.unbind('change', this.storyStateChanged);
  },

  //@Bind: Store with state
  componentDidMount: function () {
    myStore.bind('change', this.storyStateChanged);
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
          <DesignerView frameData={aFrames} store={myStore}/>
        </div>
    )
  }
});     // <ContentEditDesignView frameData={aFrames} />

module.exports = ApplicationController;