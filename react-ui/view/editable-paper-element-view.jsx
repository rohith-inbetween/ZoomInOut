var myStore = require("./../application-store");
var React = require('react');

var MultiSearchView = require('../libraries/multiselectsearchview/multiselect-search-view.jsx').view;
var DropDownListView = require('../libraries/dropdownlistview/drop-down-list-view.jsx').view;

var DropDownListModel = require('../libraries/dropdownlistview/model/drop-down-list-model.js');
var MultiSearchModel = require('../libraries/multiselectsearchview/model/multiselect-search-view-model.js');

var _ = require('lodash');
var oTemplates = require("../mockData").templates;


var EditablePaperElementView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object,
    level: React.PropTypes.number
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
    myStore.modifyTitle(frameID, oModel.getName());
  },

  render: function(){
    var oFrameData = this.props.frameData;
    var iFrameLevel = this.props.level | 1;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditablePaperElementView frameData={oChildFrameData} level={iFrameLevel + 1}/>
      );
    }
    var  aDropDownListModel = _.map(oTemplates, function(oItem){
      return new DropDownListModel(oItem.id, oItem.title, false, {});
    });
    var oMultisearchModel = new MultiSearchModel(aDropDownListModel, [new DropDownListModel("N/A",oFrameData.title,false,{})], true, 200, oFrameData.id, true, false);
    var oSelectedModel = [new DropDownListModel("N/A",oFrameData.title,false,{})];
    var sContainerChildrenClasses = "container-children " + oFrameData.visibilityState;
    return(
      <div className="paper-element" onClick = {this.handleClick}>
        <MultiSearchView model={oMultisearchModel} selectedModel={oSelectedModel}
          onNodeClick={this.onClickNode}
          onChange={this.handleOnChange}
          onKeyDown={this.keyDown}
          onBlur={this.blur}
          ref="editableTitleDiv"/>
        <div className={sContainerChildrenClasses}>
          {aContainerContents}
        </div>
      </div>
    );
  }
});

module.exports = EditablePaperElementView;

