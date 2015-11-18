var React = require('react');
var myStore = require('./application-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var $ = require('jquery');

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

  },

  componentDidMount: function(){
    this.getDOMNode().addEventListener("transitionend", this.handleScroll.bind(this));
  },

  componentWillUnmount: function(){
    this.getDOMNode().removeEventListener("transitionend", this.handleScroll.bind(this));
  },


  handleScroll : function(){
    if(myStore.expandedFrames.frame == this.props.frameData.id){
      //alert("handleScroll");
      var containerDOM = document.getElementById("design-view-element-container");
      var oCurrentDom = this.getDOMNode();
      //containerDOM.scrollTop = oCurrentDom.offsetTop - containerDOM.offsetTop;
      $(containerDOM).animate({
        scrollTop: oCurrentDom.offsetTop - containerDOM.offsetTop - 20
      }, 300);
    }
  },

  render : function(){

    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    var sClasses = "design-element";
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditableDeignView frameData={oChildFrameData}/>
      );
    }
    if(myStore.isFrameExpanded(oFrameData.id)){
      sClasses += " expanded zoomed-in";
    } else if(myStore.isParentExpanded(oFrameData.id)){
      sClasses += " childExpanded";
    }
    return (
        <div key={oFrameData.id}
          className={sClasses}
          onClick={this.handleOnClick}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}>
          <div id={oFrameData.id}
            className="design-element-title"
            ref="designTitleDiv"
            data-uuid={oFrameData.id}>
              {oFrameData.title}
          </div>
          <ReactCSSTransitionGroup component="div" className="container-children" transitionName="design-element-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {aContainerContents}
          </ReactCSSTransitionGroup>
        </div>
    );

  }

});

module.exports = EditableDeignView ;