/**
 * Created by DEV on 16-11-2015.
 */

var AppView = require("./application-view.jsx");
var myStore = require("./application-store");

var React = require('react');

var AppController = React.createClass({


  //@UnBind: store with state
  componentWillUnmount: function () {
    myStore.unbind('change', this.storyStateChanged);
    //this.props.storyAction.deRegisterEvent();
  },

  //@Bind: Store with state
  componentDidMount: function () {
    myStore.bind('change', this.storyStateChanged);
    //this.props.storyAction.registerEvent();

  },


  storyStateChanged: function () {
    this.setState({
      data: myStore.getFrameData()
    });
  },


  render: function () {
    console.log("HEKLLOOO!@#!@#");
    var aFrameData = this.props.data;
    var aFrameElements = [];
    for(var i = 0 ; i < aFrameData.length ; i++){
      aFrameElements.push(
          <AppView frameData={aFrameData[i]}/>
      );
    }
    return (
        <div className="appController">
          {aFrameElements}
        </div>
    )
  }
});

module.exports = AppController;