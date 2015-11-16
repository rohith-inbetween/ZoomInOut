var uuid = require("./uuid");
var mockData = require("./mockData");
var MicroEvent = require("./microEvent/MicroEvent");


var store = {

  data: mockData,

  _triggerChange: function(){
    return store.trigger('change');
  },


  getTextFrame: function(frameID){
    var frameData = this.findTextFrame(this.data, frameID);
    return frameData;
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
        this.findTextFrame(parentArray[i].contents, frameID);
      }
    }
  },

 createNewFrame: function (newTitle, frameID){

   var frameData = this.getTextFrame(frameID);
   frameData.frame.title = newTitle;
   frameData.parentArray.push(this.createTextFrame());

   this._triggerChange();
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
  }


};

MicroEvent.mixin(store);

module.exports = store;