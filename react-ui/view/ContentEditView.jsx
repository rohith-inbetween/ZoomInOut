var React = require('react');

var myStore = require('./../application-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var TextField = require('material-ui').TextField;
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Colors = require('material-ui/lib/styles/colors');
var _ = require('lodash');

var ContentEditView = React.createClass({

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

  initializeFroalaEditor: function () {
    var oFrame = this.props.frameData;
    var oDOM = this.getDOMNode();
    if (!oFrame.contents.length) {
      var $dom = $(oDOM).find('.text-editor:first');
      if ($dom.length && !$dom.data('froala.editor')) {
        $dom.hide();
        $dom.froalaEditor({
          toolbarButtons: ['bold', 'italic', 'underline',
            'strikeThrough', 'subscript', 'superscript', 'color', '-', 'paragraphFormat',
            'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage',
            'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo'],
          toolbarInline: true
        });
        $dom.show();
        $dom.on('click', function (oEvent) {
          oEvent.stopPropagation()
        });
        $dom.froalaEditor('html.set', oFrame.data);
        $dom.on('froalaEditor.contentChanged', function (e, editor) {
          var oInnerHTML = $(this).froalaEditor('html.get', true);
          myStore.setHtmlEditorData(oFrame.id, oInnerHTML);
        });
      }
    }
  },

  componentDidUpdate: function() {
    var oFrame = this.props.frameData;
    var oDOM = this.getDOMNode();
    //Set expanded height according to container height
    /*if (myStore.expandedFrames.frame == oFrame.id) {
      var iContainerHeight = document.getElementById('design-view-element-container').offsetHeight;
      var iFrameHeight = (95 / 100 * iContainerHeight);
      $(oDOM).css('height', iFrameHeight);
      $(oDOM).css('min-height', iFrameHeight);
    } else {
      $(oDOM).css('height','auto');
      $(oDOM).css('min-height','');
    }*/
    //Initialize/Destroy froala
    this.initializeFroalaEditor();
    if(oFrame.id == myStore.getClickedFrame().id && !myStore.isScrollComplete()){
      this.scrollIntoView();
      myStore.setScrollComplete();
    }
  },

  componentDidMount: function(){
    this.initializeFroalaEditor();
    //this.getDOMNode().addEventListener("transitionend", this.handleScroll.bind(this));
  },

  componentWillUnmount: function(){
    //this.getDOMNode().removeEventListener("transitionend", this.handleScroll.bind(this));
  },

  handleClickUploadPlus: function(){
    var oDOM = this.getDOMNode();
    $(oDOM).find('.fileUpload').click();
  },

  uploadImage: function(oEvent){
    var oFrame = this.props.frameData;
    var oImageFiles = oEvent.target.files;
    myStore.setImage(oFrame.id, oImageFiles);
  },

  scrollIntoView: function () {
    var containerDOM = document.getElementById("design-view-element-container");
    var oCurrentDom = this.getDOMNode();
    $(containerDOM).animate(
        {scrollTop: oCurrentDom.offsetTop - containerDOM.offsetTop},
        100
    );
  },

  /*handleScroll : function(){
    var fID = this.props.frameData.id;
    if(myStore.expandedFrames.frame == fID ){
      this.scrollIntoView();
    }
  },*/

  onChangeHandle: function(sElementRef, oEvent) {
    var fId = this.props.frameData.id;
    var sStringData = oEvent.target.value;
    myStore.setObjectData(sStringData, fId, sElementRef);
  },

  compressUncompress: function(oEvent){

    var oDom = this.getDOMNode().childNodes[1];
    if(_.includes(oDom.classList, 'compress')){
      oDom.classList.remove('compress');
    }else{
      oDom.classList.add('compress');
    }
  },

  createImageSelectorDiv: function (sData) {
    var oContentDataDiv = null;
    if (sData == "") {
      oContentDataDiv = (<div className="addImageOption">
        <input className="fileUpload"
        type="file"
        accept="image/*"
        style={{display: "none"}}
        onChange={this.uploadImage}/>
        <div className="insert-image-button" onClick={this.handleClickUploadPlus} title="Add Image"></div>
        <div className="insert-image-label">Click to add image</div>
      </div>);
    }
    else {
      oContentDataDiv = (<img className="image-frame-data" src={sData} />);
    }
    return oContentDataDiv;
  },

  render : function(){
    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    var iLevel = this.props.level;
    if(!iLevel){
      iLevel = 1;
    }
    var sClasses = "content-edit-element";
    var isFrameExpanded = myStore.isFrameExpanded(oFrameData.id);
    var aDataDivs = _.map(oFrameData.attributes, function(sAttributeValue, sAttributeName){
      if(sAttributeName == 'image'){
        return this.createImageSelectorDiv(sAttributeValue);
      } else {
        var bMultiLine = sAttributeName.toLocaleLowerCase() == "briefing";
        return (<TextField ref={sAttributeName}
        floatingLabelText={sAttributeName.capitalizeFirstLetter()}
        defaultValue={sAttributeValue}
        onBlur={ this.onChangeHandle.bind(this,sAttributeName)}
        onClick={function(oEvent){oEvent.stopPropagation()}}
        style={{width:'100%', height: '65px'}}
        underlineStyle={{'border-color':'#7B7B7B', bottom: '10px'}}
        floatingLabelStyle={{color:'#E4E4C3', 'font-size':'.9rem', top: '29px'}}
        inputStyle={{color:'white', 'margin-top': '7px'}}
        multiLine={bMultiLine}/>
        );
      }
    }.bind(this));

    var oContentDataDiv = null;
    if(!oFrameData.contents.length){
      var sData = oFrameData.data;
      if(oFrameData.type=='textFrame'){
        oContentDataDiv = (<TextField ref="Content"
        floatingLabelText="Content"
        defaultValue={sData}
        onBlur={this.onChangeHandle.bind(this,"content")}
        onClick={function(oEvent){oEvent.stopPropagation()}}
        style={{width:'100%'}}
        underlineStyle={{'border-color':'#7B7B7B'}}
        floatingLabelStyle={{color:'#E4E4C3', 'font-size': '.9rem'}}
        inputStyle={{color:'white'}}
        multiLine={true}/>
        );
      }
      else if(oFrameData.type == 'HTML'){
        var oDangerousHTML = {__html:sData};
        oContentDataDiv = (<div className="text-editor" onClick = {this.handleOnClick}>
         </div>);
      }
      else if(oFrameData.type == 'imageFrame'){
        oContentDataDiv = this.createImageSelectorDiv(sData);
      }
    }
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <ContentEditView level={iLevel + 1} frameData={oChildFrameData} key={oChildFrameData.id}/>
      );
    }
    sClasses += " level" + iLevel;

    return (
        <div key={oFrameData.id}
        className={sClasses}>
          <div id={oFrameData.id}
          className="content-element-title"
          data-uuid={oFrameData.id}
          onBlur={this.onChangeHandle.bind(this,"title")}
          onClick = {this.compressUncompress}
          ref="material-text-field">
              {this.props.frameData.title}
          </div>
          <div className="content-element-data">
            {aDataDivs}
          </div>
          <div className="content-data">
            {oContentDataDiv}
          </div>
          <ReactCSSTransitionGroup component="div" className="container-children" transitionName="design-element-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {aContainerContents}
          </ReactCSSTransitionGroup>
        </div>
    );

  }

});

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = ContentEditView;