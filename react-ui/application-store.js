var uuid = require("./uuid");
var mockData = require("./mockData");
var MicroEvent = require("./microEvent/MicroEvent");
var _ = require('lodash');


var store = {

  data: mockData,

  flatStructure: {},

  focusedFrameId: null,

  oCaretPosition: {
    focusId: '',
    indexToFocus: 99
  },

  triggerChange: function(){
    return store.trigger('change');
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
    this.triggerChange();
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
      "contents" : [],
      "parentId": parentId
    };
    this.setFlatStructure(newTextFrame);
    return newTextFrame
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
    var oFrameData = this.findTextFrame(parentArray, frameId)
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
    var oFrameData = this.findTextFrame(parentArray, frameId)

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

    this.triggerChange();
  },

  setFlatStructure: function(oFrameObject){
    this.flatStructure[oFrameObject.id] = oFrameObject;
  },

  getFrameObject: function(sFrameId){
    return this.flatStructure[sFrameId];
  },

  removeFrame: function(sFrameId){
    var oFrameObject = this.flatStructure[sFrameId];
    delete this.flatStructure[sFrameId];
    var sParentId = oFrameObject.parentId;
    var parentArray = this.data;
    if(sParentId){
      var parentFrame = this.flatStructure[sParentId];
      parentArray = parentFrame.contents;
    }
    var oFrameData = this.findTextFrame(parentArray, sFrameId);
    parentArray.splice(oFrameData.index, 1);
    this.setFocusedFrameId(parentArray[oFrameData.index-1]);

    this.triggerChange();
  },

  initialize: function(){
    this.initializeFlatStructure(this.data)
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

    //this.triggerChange();
  }

};

MicroEvent.mixin(store);

module.exports = store;