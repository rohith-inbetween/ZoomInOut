var uuid = require("./uuid");
var mockData = require("./mockData");
var MicroEvent = require("./microEvent/MicroEvent");


var store = {

  data: mockData,

  focusedFrameId: null,

  oCaretPosition: {
    focusId: '',
    indexToFocus: 0
  },

  triggerChange: function(){
    return store.trigger('change');
  },


  getTextFrame: function(frameID){
    return this.findTextFrame(this.data, frameID);
  },

  findTextFrame: function(parentArray, frameID){
    for(var i=0; i<parentArray.length ;i++){
      if(parentArray[i].id == frameID){
        return {
          frame : parentArray[i],
          parentArray: parentArray,
          index: i
        };
      } else{
        var frameData = this.findTextFrame(parentArray[i].contents, frameID);
        if(frameData){
          return frameData;
        }
      }
    }
  },

  createNewFrame: function (newTitle, frameID) {

    var frameData = this.getTextFrame(frameID);
    frameData.frame.title = newTitle;
    var newFrame = this.createTextFrame();
    frameData.parentArray.push(newFrame);

    this.oCaretPosition.focusId = newFrame.id;
    this.oCaretPosition.indexToFocus = 0;


    //this.setFocusedFrameId(newFrame.id);

    this.triggerChange();
  },

  setFocusedFrameId: function(frameDOMid){
    this.focusedFrameId = frameDOMid;
  },

  getFocusedFrameId: function(){
    return this.focusedFrameId;
  },

  createTextFrame: function(){
    return{
      "id" : uuid.generateUUID(),
        "type" : "textFrame",
        "title": "",
        "contents" : []
    };

  },

  getFrameData: function(){
    return this.data;
  },

  removeFrame: function(frameID){
    var frameData = this.getTextFrame(frameID);
    var frameDOMID= frameData.parentArray[frameData.index-1].id;
    this.setFocusedFrameId(frameDOMID);

    this.oCaretPosition.focusId = frameDOMID;


    frameData.parentArray.splice(frameData.index);

    this.triggerChange();

  },

  makeParentContainerAndAddToParent: function(frameId){
    var frameData = this.getTextFrame(frameId);
    var parentArray = frameData.parentArray;
    var frame = parentArray.splice(frameData.index,1);
    var newParent = parentArray[parentArray.length - 1];
    newParent.type = 'container';
    newParent.contents.push(frame[0]);
    this.triggerChange();
  }

};

MicroEvent.mixin(store);

module.exports = store;