var uuid = require("./uuid");
//var mockData = require("./mockData").visualAttr;
var MicroEvent = require("./microEvent/MicroEvent");
var _ = require('lodash');


var store = {

  data: [],

  flatStructure: {},

  focusedFrameId: null,

  offsetTopFrameID : null,

  clickedFrameId : null,

  clickedFrame: null,

  newFrame: null,

  expandedFrames : {
    frame :null,
    parentFrames :{}
  },


  zoomedInFrameId: null,

  oCaretPosition: {
    focusId: '',
    indexToFocus: 99
  },

  aClickedFrames:[],


  setCaretPositionObjtoNull: function(){
    this.oCaretPosition.focusId = '';
    this.oCaretPosition.indexToFocus = 99;
  },

  triggerChange: function(){
    return store.trigger('change');
  },

  setClickedFrame: function(frame){
    this.clickedFrame = frame;
  },

  getClickedFrame: function(){
    return this.clickedFrame;
  },

  setClickedFrameArray :function(frame){
    this.aClickedFrames.push(frame);
    this.triggerChange();
  },

  getClickedFrameArray: function(){
    return this.aClickedFrames;
  },


  /*handleScroll : function(frameID){

    var containerDOM = document.getElementsByClassName("design-view-elements");

  },*/

  setClass : function(frameID){
    var oFrame = this.getFrameObject(frameID);
    this.expandedFrames.parentFrames = {};
    if(this.expandedFrames.frame == frameID ){
      this.expandedFrames.frame = null;
    } else {
      var oParentFrame = this.getFrameObject(oFrame.parentId);
      this.expandedFrames.frame = frameID;



      if(oParentFrame){
        this.setParentExpanded(oParentFrame);
      }
    }

    //this.handleScroll(frameID);

    /*if(oFrame.isExpanded){
      oFrame.isExpanded = false;
    } else {
      oFrame.isExpanded = true;
    }*/

/*
    if(this.zoomedInFrameId == frameID){
      this.zoomedInFrameId = null
    } else {
      this.zoomedInFrameId = frameID;
    }
*/
    this.triggerChange();
  },

  isFrameExpanded : function(frameID){
     return this.expandedFrames.frame == frameID;
  },

  isParentExpanded : function(frameID){
    return this.expandedFrames.parentFrames[frameID] == true;
  },

  setParentExpanded : function(oFrame){
    this.expandedFrames.parentFrames[oFrame.id] = true;
    var oParentFrame = this.getFrameObject(oFrame.parentId);
    if(oParentFrame){
      this.setParentExpanded(oParentFrame);
    }
  },

  getZoomedInFrameId : function(){
    return this.zoomedInFrameId;
  },

  findTextFrame: function(parentArray, frameID){
    for(var i=0; i<parentArray.length ;i++){
      if(parentArray[i].id == frameID){
        return {
          frame : parentArray[i],
          parentArray: parentArray,
          index: i
        };
      }
    }
  },

  createNewFrame: function (newTitle, frameID) {

    var oFrame = this.getFrameObject(frameID);
    oFrame.title = newTitle;
    var newFrame = this.createTextFrame(oFrame.parentId);
    var aParentArray = this.data;
    if(oFrame.parentId){
      var oParentFrame = this.getFrameObject(oFrame.parentId);
      aParentArray = oParentFrame.contents;
    }
    var oFrameData = this.findTextFrame(aParentArray, frameID);
    aParentArray.splice(oFrameData.index + 1, 0, newFrame);
    //this.setFocusedFrameId(newFrame.id);
    this.oCaretPosition.focusId = newFrame.id;
    this.oCaretPosition.indexToFocus = 0;
    this.setClickedFrame(newFrame);
    this.setNewFrame(newFrame);
    this.triggerChange();
  },

  setNewFrame: function(frame){
    this.newFrame = frame ;
  },

  getNewFrame: function(){
    return this.newFrame;
  },


  setHtmlEditorData: function(fID, data){
    var oFrame = this.getFrameObject(fID);
    oFrame.data = data;
  },

  setFocusedFrameId: function(frameDOMid){
    this.focusedFrameId = frameDOMid;
  },

  getFocusedFrameId: function(){
    return this.focusedFrameId;
  },

  createTextFrame: function(parentId){
    var newTextFrame = {
      "id" : uuid.generateUUID(),
      "type" : "textFrame",
      "title": "",
      "attributes":{
        "briefing":"",
        "tags":""
      },
      "data":"",
      "contents" : [],
      "parentId": parentId
    };
    this.setFlatStructure(newTextFrame);
    return newTextFrame;
  },

  getFrameData: function(){
    return this.data;
  },

  changeParentToContainerAndAddToParent: function(newData, frameId){
    var oFrame = this.getFrameObject(frameId);
    var parentArray = this.data;
    if(oFrame.parentId){
      var oParentFrame = this.getFrameObject(oFrame.parentId);
      parentArray = oParentFrame.contents;
    }
    var oFrameData = this.findTextFrame(parentArray, frameId);
    var newParent = parentArray[oFrameData.index - 1];
    if(newParent == null){
      return;
    }
    parentArray.splice(oFrameData.index,1);
    oFrame.title = newData;
    newParent.type = 'container';
    newParent.contents.push(oFrame);
    oFrame.parentId = newParent.id;
    this.setFocusedFrameId(oFrame.id);
    this.oCaretPosition.focusId = oFrame.id;
    this.oCaretPosition.indexToFocus = 0;
    this.setClickedFrame(oFrame);

    this.triggerChange();
  },

  makeParentAndAddSiblingsToChildren: function(newData, frameId){
    var oFrame = this.getFrameObject(frameId);
    var parentArray = this.data;
    if(oFrame.parentId){
      var oParentFrame = this.getFrameObject(oFrame.parentId);
      parentArray = oParentFrame.contents;
    } else {
      return;
    }
    var oFrameData = this.findTextFrame(parentArray, frameId);

    //Get New Children
    var aNewChildren = parentArray.splice(oFrameData.index + 1, parentArray.length - oFrameData.index + 1);
    oFrame.contents = oFrame.contents.concat(aNewChildren);
    _.each(oFrame.contents, function(oData, key){
      oData.parentId = oFrame.id;
    });

    //Get New Parent
    var oCurrentParent = this.getFrameObject(oFrame.parentId);
    var oNewParent = this.getFrameObject(oCurrentParent.parentId);
    var newParentArray = this.data;
    if(oNewParent){
      newParentArray = oNewParent.contents;
    }
    var oCurrentParentData = this.findTextFrame(newParentArray, oCurrentParent.id);
    //remove from previous parent
    parentArray.splice(oFrameData.index,1);

    oFrame.title = newData;

    newParentArray.splice(oCurrentParentData.index + 1, 0, oFrame);
    oFrame.parentId = oNewParent ? oNewParent.id : null;

    this.setFocusedFrameId(oFrame.id);
    this.oCaretPosition.focusId = oFrame.id;
    this.oCaretPosition.indexToFocus = 0;
    this.setClickedFrame(oFrame);

    this.triggerChange();
  },

  setFlatStructure: function(oFrameObject){
    this.flatStructure[oFrameObject.id] = oFrameObject;
  },

  getFlatStructure: function(){
    return this.flatStructure;
  },

  getFrameObject: function(sFrameId){
    return this.flatStructure[sFrameId];
  },

  removeIndividualFrame: function(sFrameId , isFromArray){
    var keyList = Object.keys(this.flatStructure);
    if(keyList.length > 1 && keyList.indexOf(sFrameId) > -1){
      var oFrameObject = this.flatStructure[sFrameId];
      var sParentId = oFrameObject.parentId;
      var parentArray = this.data;
      if (sParentId) {
        var parentFrame = this.flatStructure[sParentId];
        parentArray = parentFrame.contents;
      }
      var oFrameData = this.findTextFrame(parentArray, sFrameId);
      if (!sParentId) {
        if (oFrameData.index == 0) {
          return;
        }
      }
      delete this.flatStructure[sFrameId];
      parentArray.splice(oFrameData.index,1);
      if(!isFromArray ){
        if(parentArray[oFrameData.index-1]){
          this.setFocusedFrameId(parentArray[oFrameData.index-1].id);
          this.oCaretPosition.focusId = parentArray[oFrameData.index-1].id;
          this.setClickedFrame(parentArray[oFrameData.index-1]);
        }else{
          this.setFocusedFrameId(parentFrame.id);
          this.oCaretPosition.focusId = parentFrame.id;
          this.setClickedFrame(parentFrame);
        }
        this.oCaretPosition.indexToFocus = 99;
        this.triggerChange();
      }
    }
  },


  removeFrame: function(param, isArray) {
    var sFrameId;
    if (isArray) {
      for (var i = 0; i < param.length; i++) {
        sFrameId = param[i].id;
        this.removeIndividualFrame(sFrameId, true);
      }
      this.enableAllClickAndMakeClickFrameArrayNull();
    }
    else{
      sFrameId = param;
      this.removeIndividualFrame(sFrameId);
    }

  },

  makeClickedFrameNull : function(){
    this.clickedFrame = null;
    this.triggerChange();
  },

  enableAllClickAndMakeClickFrameArrayNull: function(){
    this.aClickedFrames = [];
    this.triggerChange();
  },

  initialize: function(){
    this.data.push(this.createTextFrame());
    this.initializeFlatStructure(this.data)
    return this.data;
  },

  initializeFlatStructure: function(aParentArray){
    for(var i = 0 ; i < aParentArray.length ; i++){
      var oFrame = this.data[i];
      this.setFlatStructure(oFrame);
      this.initializeFlatStructure(oFrame.contents);
    }
  },

  modifyTitle: function(frameId, textContent){
    var oFrame = this.getFrameObject(frameId);
    oFrame.title = textContent;

    this.triggerChange();
  },

  setObjectData: function(sData, iId, sElementRef){
    var aData = this.data;

    var oFrame = this.findIntheData(iId, aData);
    if(sElementRef == 'content'){
      oFrame.data = sData;
    } else {
      oFrame.attributes[sElementRef] = sData;
    }
    this.triggerChange();
  },

  findIntheData: function(iId, aData){

    for(var i=0; i < aData.length; i++){
      if(aData[i].contents.length>0){
        this.findIntheData(iId, aData[i].contents);
      }
      else{
        if(iId == aData[i].id){
          return aData[i];
        }
      }

    }
  },

  traverseFrames: function(aFrames, sSelect){
    for(var i=0; i < aFrames.length; i++){

      if(sSelect=="Collapse"){
        this.handleCompressIterator(aFrames[i].id);
      }
      else if(sSelect=="Expand"){
        this.handleExpandIterator(aFrames[i].id);
      }


      if(aFrames[i].contents.length>0){
        this.traverseFrames(aFrames[i].contents, sSelect);
      }
    }
  },

  collapseExpandAll: function(sSelect){
    var aFrames = this.data;
    this.traverseFrames(aFrames, sSelect);
  },

  handleCompressIterator: function(fID){
    var oDom = document.getElementById(fID).parentNode.childNodes[1];
    if(!(_.includes(oDom.classList, 'compress'))){
      oDom.classList.add('compress');
    }
  },

  handleExpandIterator: function(fID){
    var oDom = document.getElementById(fID).parentNode.childNodes[1];
    if((_.includes(oDom.classList, 'compress'))){
      oDom.classList.remove('compress');
    }
  }




};

MicroEvent.mixin(store);

module.exports = store;