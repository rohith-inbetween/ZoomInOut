var React = require('react');


var myStore = require('./../application-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var TextField = require('material-ui').TextField;
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Colors = require('material-ui/lib/styles/colors');

var $ = require('jquery');
window.jQuery = $;
//var jQuery = $;
require('froala-editor/js/froala_editor.min.js')();
require('froala-editor/js/plugins/align.min.js');
require('froala-editor/js/plugins/colors.min.js');
require('froala-editor/js/plugins/emoticons.min.js');
require('froala-editor/js/plugins/image.min.js');
require('froala-editor/js/plugins/inline_style.min.js');




var ContentEdit = React.createClass({



  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes:{
    frameData:React.PropTypes.object
  },

  handleOnClick: function(oEvent){
    var frameID = this.props.frameData.id;
    myStore.setClass(frameID);
    oEvent.stopPropagation();
  },

  initializeFroalaEditor: function ($dom, oFrame) {
    $dom.hide();
    $dom.froalaEditor({
      toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize',
        '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle',
        '|', 'paragraphFormat', 'align', 'insertImage']
    });
    $dom.show();
    $dom.on('click', function (oEvent) {
      oEvent.stopPropagation()
    });
    $dom.on('froalaEditor.contentChanged', function (e, editor) {
      var oInnerHTML = $(this).froalaEditor('html.get', true);
      myStore.setHtmlEditorData(oFrame.id, oInnerHTML);
    });
  },

  componentDidUpdate: function() {
    var oFrame = this.props.frameData;
    var oDOM = this.getDOMNode();


    //Set expanded height according to container height
    if (myStore.expandedFrames.frame == oFrame.id) {
      var iContainerHeight = document.getElementById('design-view-element-container').offsetHeight;
      var iFrameHeight = (95 / 100 * iContainerHeight);
      $(oDOM).css('height', iFrameHeight);
      $(oDOM).css('min-height', iFrameHeight);
    } else {
      $(oDOM).css('height','auto');
      $(oDOM).css('min-height','');
    }

    //Initialize/Destroy froala
    if(!oFrame.contents.length){
      var $dom =$(oDOM).find('.text-editor:first');
      if (myStore.expandedFrames.frame == oFrame.id) {
        if(!$dom.data('froala.editor')){
          this.initializeFroalaEditor($dom, oFrame);
        }
      } else {
        $dom.off('click');
        $dom.off('froalaEditor.contentChanged');
        $dom.froalaEditor('destroy');
      }
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
      var containerDOM = document.getElementById("design-view-element-container");
      var oCurrentDom = this.getDOMNode();
      $(containerDOM).animate(
          {scrollTop: oCurrentDom.offsetTop - containerDOM.offsetTop - 20},
          100
      );
    }
  },

  onChangeHandle: function(oEvent) {
    var oDom = this.refs['material-text-field'];
    var sNewTitle = oDom.getValue();
    myStore.modifyTitle(this.props.frameData.id, sNewTitle);
  },

  render : function(){
    var oFrameData = this.props.frameData;

    var sClasses = "content-edit-element";
    var oDiv = null;
    if(!oFrameData.contents.length){
      var oDangerousHTML = {__html: oFrameData.data};
      oDiv =
          (<div className="text-editor"
          dangerouslySetInnerHTML={oDangerousHTML}>
          </div>);
    }

    var fOnClick;
    if(myStore.isFrameExpanded(oFrameData.id)){
      sClasses += " expanded";
      fOnClick = function(oEvent){
        oEvent.stopPropagation();
      };
    }

    return (
        <div key={oFrameData.id}
        className={sClasses}
        onClick={this.handleOnClick}>
          <div id={oFrameData.id}
          className="content-element-title"
          data-uuid={oFrameData.id}>
              <div ref="material-text-field" onBlur={this.onChangeHandle} onClick={fOnClick}>{this.props.frameData.title}</div>
          </div>
          {oDiv}
        </div>
    );

  }

});


module.exports = ContentEdit;