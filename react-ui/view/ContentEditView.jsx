var React = require('react');

var myStore = require('./../application-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var TextField = require('material-ui').TextField;
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Colors = require('material-ui/lib/styles/colors');
var _ = require('lodash');

var sCoreMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";

var ContentEditView = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes:{
    frameData:React.PropTypes.object,
    label: React.PropTypes.string
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
          toolbarButtons: ['formatOL', 'formatUL', 'indent', 'outdent', 'undo', 'redo'],
          toolbarInline: true,
          charCounterMax: 200
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

    var $dummyDom = $('#design-view-element-container').find('.dummyNodeFroala');
    if ($dummyDom.length > 0) {
      if ($dummyDom.length && !$dummyDom.data('froala.editor')) {
        $dummyDom.hide();
        $dummyDom.froalaEditor({
          toolbarButtons: ['formatOL', 'formatUL', 'indent', 'outdent', 'undo', 'redo'],
          toolbarInline: true,
          charCounterMax: 200
        });
        $dummyDom.show();
        $dummyDom.on('click', function (oEvent) {
          oEvent.stopPropagation()
        });
        $dummyDom.froalaEditor('html.set', sCoreMsg);
        $dummyDom.on('froalaEditor.contentChanged', function (e, editor) {
          var oInnerHTML = $(this).froalaEditor('html.get', true);
          myStore.setHtmlEditorData(oFrame.id, oInnerHTML);
        });
      }
    }

    if($('body').hasClass('view3')){
      $dummyDom.froalaEditor('edit.off');
    } else{
      $dummyDom.froalaEditor('edit.on');
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

    var $tooltipIni = $(this.getDOMNode()).find('.tooltip').eq(0);
    /*if($tooltipIni.data('toolIni')){
      $tooltipIni.tooltipster('destroy');
    }*/

    $tooltipIni.tooltipster('content', oFrame.attributes && oFrame.attributes.briefing ? oFrame.attributes.briefing : "");
    //$tooltipIni.data('toolIni', true);

    if($('body').hasClass('view3')){
      $('.dummyNode').find("input").prop( "disabled", true );
    } else{
      $('.dummyNode').find("input").prop( "disabled", false );
    }

    this.insertInputValues();
  },

  componentDidMount: function(){
    this.initializeFroalaEditor();
    var $tooltipIni = $(this.getDOMNode()).find('.tooltip').eq(0);
    $tooltipIni.tooltipster({
      trigger: 'click',
      position: 'left',
      maxWidth: 300,
      contentAsHTML: true
    });
   /* $(this.getDOMNode()).find('.tooltip').tooltipster({
      trigger: 'click'
    });*/
    //this.getDOMNode().addEventListener("transitionend", this.handleScroll.bind(this));
    this.insertInputValues();
  },

  componentWillUnmount: function(){
    //this.getDOMNode().removeEventListener("transitionend", this.handleScroll.bind(this));
  },

  handleClickUploadPlus: function(){
    var oDOM = this.getDOMNode();
    $(oDOM).find('.fileUpload:first').click();
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
      oContentDataDiv = (<div key="imageOption" className="addImageOption">
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

  handleBriefingClicked:function(ev){
    ev.stopPropagation();
  },

  insertInputValues: function(){

    var oInput1 = this.refs.input1 ? this.refs.input1.getDOMNode() : {};
    var oInput2 = this.refs.input2 ? this.refs.input2.getDOMNode() : {};
    var oInput3 = this.refs.input3 ? this.refs.input3.getDOMNode() : {};

    oInput1.value = "01.12.2015";
    oInput2.value = "James Cruz / Allianz Leben";
    oInput3.value = "Mimi Oberhauser / ABV";

    $.each($(this.getDOMNode()).find('.dumFieldVal'), function(index, $abc){
      if($('body').hasClass('view1')){
        $abc.disabled = false;
      } else {
        $abc.disabled = true;
       }
    })
  },

  render : function(){
    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    var iLevel = this.props.level;
    var sLabel123 = this.props.label;
    var oDummyNode = "";
    var oDummyNodeCoreMsg = "";
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
      if(oFrameData.type=='textFrame' && oFrameData.dataLength != 0){
        oContentDataDiv = (<TextField key="contentData" ref="Content"
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
        oContentDataDiv = (<div key="text-editor" className="text-editor" onClick = {this.handleOnClick}>
         </div>);
      }
      else if(oFrameData.type == 'imageFrame'){
        oContentDataDiv = this.createImageSelectorDiv(sData);
      }
    }
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <ContentEditView level={iLevel + 1} label={sLabel123 + "." + (i+1)} frameData={oChildFrameData} key={oChildFrameData.id}/>
      );
    }
    sClasses += " level" + iLevel;

    var sBriefingIconClassName = "briefingIcon tooltip ";
    var sBriefingIconTitle = "";

    if(oFrameData.attributes && oFrameData.attributes.briefing && oFrameData.attributes.briefing.length > 0){
      sBriefingIconTitle += oFrameData.attributes.briefing;
    }else{
      sBriefingIconClassName += "briefingHidden";
    }

    if(oFrameData.id == "1_1_1"){
      oDummyNodeCoreMsg = (
          <div className="dumDumWrapper dummyCoreMsg">
            <div className="dummyNodeCoreMsg">{sCoreMsg}</div>
          </div>
      );

      oDummyNode = (<div className="dummyNode">
        <div className="dumDum">Themenbaustein Briefing</div>
        <div className="dumDumWrapper">
          <div className="dumDum">Kernaussage</div>
          <div className="dummyNodeFroala"></div>
        </div>
        <div className="dumDumWrapper">
          <div className="dumDumSplit">
            <div className="dumDum">Briefing-1</div>
            <div className="dummyNodeFroala"></div>
          </div>
          <div className="dumDumSplit">
            <div className="dumDum">Briefing-2</div>
            <div className="dummyNodeFroala"></div>
          </div>
        </div>
        <div className="dumDumWrapper">
          <div className="dumDum">Themenbaustein Planung</div>
          <div className="dumFieldWrapper">
            <div className="dumFieldKey">erledigen bis:</div>
            <input ref="input1" disabled="disabled" className="dumFieldVal"/>
          </div>
          <div className="dumFieldWrapper">
            <div className="dumFieldKey">Redaktion fachlich:</div>
            <input ref="input2" disabled className="dumFieldVal"/>
          </div>
          <div className="dumFieldWrapper">
            <div className="dumFieldKey">Redaktion vertrieblich:</div>
            <input ref="input3" disabled className="dumFieldVal"/>
          </div>
          <div className="dumFieldWrapper">
            <div className="dumFieldKey">Redaktionsstatus:</div>
              <select className="dumSelect">
                  <option value="">Fertig zur fachlichen Bearbeitung</option>
                  <option value="">Fachliche Bearbeitung abgeschlossen</option>
                  <option value="">Fertig zur Freigabe</option>
              </select>
          </div>
        </div>
      </div>);
    }


    return (
        <div key={oFrameData.id}
        className={sClasses}
        data-uuid={oFrameData.id}>
          <div id={oFrameData.id}
          className="content-element-title"
          data-uuid={oFrameData.id}
          onBlur={this.onChangeHandle.bind(this,"title")}
          onClick = {this.compressUncompress}
          ref="material-text-field">
              <div className="rightTreeLabel">{sLabel123}</div>
              <div className="rightTreeIcon"></div>
              {this.props.frameData.title}
            <div className={sBriefingIconClassName} onClick={this.handleBriefingClicked} title={sBriefingIconTitle}>{sBriefingIconTitle}</div>
            <div className="rightPlusIcon"></div>
          </div>
        {oDummyNodeCoreMsg}
        {oDummyNode}
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