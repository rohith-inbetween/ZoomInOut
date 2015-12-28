var myStore = require("./../application-store");
var React = require('react');

var MultiSearchView = require('../libraries/multiselectsearchview/multiselect-search-view.jsx').view;
var DropDownListView = require('../libraries/dropdownlistview/drop-down-list-view.jsx').view;

var DropDownListModel = require('../libraries/dropdownlistview/model/drop-down-list-model.js');
var MultiSearchModel = require('../libraries/multiselectsearchview/model/multiselect-search-view-model.js');

var _ = require('lodash');
var $ = require('jquery');
var oTemplates = require("../mockData").templates;


var EditablePaperElementView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object,
    level: React.PropTypes.number,
    parentLabel: React.PropTypes.string
  },

  handleOnChange: function(e){
    var frameID = this.props.frameData.id;
    myStore.modifyTitle(frameID,e.target.value);
  },

  keyDown: function(e){
    var frameID = this.props.frameData.id;
    if(e.keyCode == 13){
      e.preventDefault();
      //myStore.createNewFrame(e.target.textContent, frameID);
      myStore.createNewFrame(e.target.value, frameID);
    }
    else if(e.keyCode == 8){
      if(e.target.value.length == 0){
        e.preventDefault();
        frameID = this.props.frameData.id;
        myStore.removeFrame(frameID);
      }
    }
    else if(e.keyCode == 9){
      e.preventDefault();
      if(e.shiftKey){
        //myStore.makeParentAndAddSiblingsToChildren(e.target.textContent, frameID);
        myStore.makeParentAndAddSiblingsToChildren(e.target.value, frameID);
      } else {
        //myStore.changeParentToContainerAndAddToParent(e.target.textContent, frameID);
        myStore.changeParentToContainerAndAddToParent(e.target.value, frameID);
      }
    }
  },

  componentDidUpdate: function(){
    this.setFocusOnFocussedElement();
  },

  componentDidMount: function(){
    this.setFocusOnFocussedElement();
  },

  setFocusOnFocussedElement: function(){
    var oCaretPosition =myStore.oCaretPosition;
    var fIndex = oCaretPosition.indexToFocus;
    var focussedId = oCaretPosition.focusId;
    if(focussedId && this.props.frameData.id == focussedId){
      var oTitleDOM = this.refs.editableTitleDiv.refs.multiSearchInputBox;
      oTitleDOM.focus();
      /*var oRange = document.createRange();
      if(fIndex == 99 && oTitleDOM.textContent.length > 0){
        fIndex = oTitleDOM.textContent.length;
        oRange.setStart(oTitleDOM.firstChild, fIndex);
        oRange.setEnd(oTitleDOM.firstChild, fIndex);
      }else if(fIndex == 99 && oTitleDOM.textContent.length == 0){
        oTitleDOM.focus();
        var breakFlag = true;
      }else{
        oRange.setStart(oTitleDOM, fIndex);
        oRange.setEnd(oTitleDOM, fIndex);
      }

      if(!breakFlag){
        var oSelection = window.getSelection();
        oSelection.removeAllRanges();
        oSelection.addRange(oRange);
      }*/
      myStore.setCaretPositionObjtoNull();
    }
  },

  handleClick: function(e) {
    if (e.ctrlKey) {
      this.getDOMNode().classList.add('ctrl-clickedFrame');
      myStore.setClickedFrameArray(this.props.frameData);
    }
    else {
      //myStore.setClickedFrameArray(null);
      myStore.setClickedFrame(this.props.frameData);
    }
    e.stopPropagation();
  },

  onClickNode: function(oEvent, oModel){
    var frameID = this.props.frameData.id;
    myStore.replaceType(frameID, oModel.getName());
  },

  toggleExpandCollapse: function(oEvent){
    var oFrame = this.props.frameData;
    if(oFrame.visibilityState == 'collapsed'){
      myStore.toggleExpandCollapseFrameTreeView(oFrame.id, 'expanded');
    } else {
      myStore.toggleExpandCollapseFrameTreeView(oFrame.id, 'collapsed');
    }
  },

  handleNodeClicked: function(sId, oEvent){
    $('.content-element-title').removeClass('selected');
    $('.MultiSrchWrapper').removeClass('selected');

    $('.content-element-title[data-uuid="' + sId + '"]').addClass('selected');
    $('.MultiSrchWrapper[data-uuid="' + sId + '"]').addClass('selected');

    if($('body').hasClass('view1')){
      if(sId == "1_1_1"){
        $('.content-edit-element[data-uuid="1_1_1"]').show();
        $('.content-edit-element[data-uuid="1_1_1"]').find('.content-element-data, .content-data, .container-children').hide();
      }else{
        $('.content-edit-element[data-uuid="1_1_1"]').hide();
      }
    }

  },

  render: function(){
    var oFrameData = this.props.frameData;
    var iFrameLevel = this.props.level || 1;
    var sParentLabel = this.props.parentLabel;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditablePaperElementView frameData={oChildFrameData} level={iFrameLevel + 1} parentLabel={sParentLabel + "." + (i+1)} key={oChildFrameData.id}/>
      );
    }
    var  aDropDownListModel = _.map(oTemplates, function(oItem,sKey){
      return new DropDownListModel(sKey, oItem.title, false, {});
    });
    var oMultisearchModel = new MultiSearchModel(aDropDownListModel, [new DropDownListModel("N/A",oFrameData.title,false,{})], true, 200, oFrameData.id, true, false);
    var oSelectedModel = [new DropDownListModel("N/A",oFrameData.title,false,{})];
    var sClass = "paper-element level" + (this.props.level || 1);
    var sContainerChildrenClasses = "container-children " + oFrameData.visibilityState;
    var sExpandCollapseElementButtonClass = "toggle-button " + oFrameData.visibilityState;
    if(myStore.getClickedFrame() && oFrameData.id == myStore.getClickedFrame().id){
      sClass += " selected-paper-element"
    }
    var oIconDiv = null;
    if(oFrameData.icon){
      oIconDiv = <img className="paper-element-class-icon" src={"images/" + oFrameData.icon}></img>;
    }
    return(
      <div className={sClass} onClick = {this.handleClick}>
        <div className="MultiSrchWrapper" data-uuid={oFrameData.id} onClick={this.handleNodeClicked.bind(this, oFrameData.id)}>
          <div className="nodeRightIcon"></div>
          <div className={sExpandCollapseElementButtonClass} onClick={this.toggleExpandCollapse}></div>
          <div className="idText">{sParentLabel}</div>
          <div className="iconAb"></div>
          <MultiSearchView model={oMultisearchModel} selectedModel={oSelectedModel}
          onNodeClick={this.onClickNode}
          onChange={this.handleOnChange}
          onKeyDown={this.keyDown}
          onBlur={this.blur}
          ref="editableTitleDiv"/>
          <div className="plusIcon"></div>
        </div>
        {oIconDiv}
        <div className={sContainerChildrenClasses}>
          {aContainerContents}
        </div>
      </div>
    );
  }
});

module.exports = EditablePaperElementView;

