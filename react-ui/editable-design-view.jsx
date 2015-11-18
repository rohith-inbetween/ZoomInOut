var React = require('react');
var myStore = require('./application-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var $ = require('jquery');
require('froala-editor/js/froala_editor.min.js')();

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
    var oDOM  =this.getDOMNode();
    var jqDom =$(oDOM).find('.text-editor');
    if (  jqDom .data('froala.editor')) {
      jqDom .froalaEditor('destroy');
    }
  },

  componentDidMount: function(){
    this.getDOMNode().addEventListener("transitionend", this.handleScroll.bind(this));
  },

  componentWillUnmount: function(){
    this.getDOMNode().removeEventListener("transitionend", this.handleScroll.bind(this));
  },


  handleScroll : function(){
    var fID = this.props.frameData.id;
    if(myStore.expandedFrames.frame == fID ){
      //alert("handleScroll");
      var containerDOM = document.getElementById("design-view-element-container");
      var oCurrentDom = this.getDOMNode();
      //containerDOM.scrollTop = oCurrentDom.offsetTop - containerDOM.offsetTop;
      $(containerDOM).animate(
          {scrollTop: oCurrentDom.offsetTop - containerDOM.offsetTop - 20},
          100,
          function(){
            var $dom = $(oCurrentDom).find('.text-editor');
            $dom.froalaEditor();
            $dom.on('froalaEditor.contentChanged', function (e, editor) {
              var oInnerHTML = $dom.froalaEditor('html.get', true);
              console.log(oInnerHTML);
              myStore.setHtmlEditorData(fID,oInnerHTML);
            });

          }
      );

    }
  },

  render : function(){

    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    var sClasses = "design-element";
    var oDiv = null;
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditableDeignView frameData={oChildFrameData}/>
      );
    }
    if(myStore.isFrameExpanded(oFrameData.id)){
      sClasses += " expanded zoomed-in";
      if(!oFrameData.contents.length){
        var oDangerousHTML = {__html: oFrameData.data};
        var oTextEditor = (<div className="text-editor" onClick={function(oEvent){oEvent.stopPropagation()}} dangerouslySetInnerHTML={oDangerousHTML}></div>);
        aContainerContents.push(oTextEditor);
      }

    } else if(myStore.isParentExpanded(oFrameData.id)){
      sClasses += " childExpanded";
    }
    else{
      var oDangerousHTML = {__html: oFrameData.data};
      oDiv = (<div className="frame-data" dangerouslySetInnerHTML={oDangerousHTML}></div>);
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
          {oDiv}
          <ReactCSSTransitionGroup component="div" className="container-children" transitionName="design-element-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {aContainerContents}
          </ReactCSSTransitionGroup>
        </div>
    );

  }

});

module.exports = EditableDeignView ;