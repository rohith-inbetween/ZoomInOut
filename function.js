var aVisualAttributes = [];

$(document).ready(function(){

  var $VisAttrList = $('.visualAttributesListData');
  var aElements =_.map(aFrames, function(oVal){
    var $oElement = $('<div draggable="true" class="visualAttributeDragElement" data-id="oVal.id">'+oVal.name+'</div>');
    $oElement[0].customData = oVal;
    return $oElement;
  });
  $VisAttrList.append(aElements);

  var $EditorDropZone = $('.editorDropZone');
  $EditorDropZone.on({
    drop: handleVisAttrDrop,
    dragover: function(oEvent){
      oEvent.preventDefault();
    },
    dragleave: function(oEvent){
    }
  });

  $('.visualAttributeDragElement').on({
    dragstart: function(oEvent){
      console.log("START");
      console.log(oEvent);
      oEvent.originalEvent.dataTransfer.setData('customData',JSON.stringify(oEvent.target.customData));
    },
    dragend: function(oEvent){
      console.log("END");
      console.log(oEvent);
    }
  });

});

function createContainer(){
  var oContainer = {
    "id": generateUUID(),
    "type": "container",
    "title": "Container",
    "properties": {
      "sequence": 0,
      "style": {
        "zIndex": 0,
        "height": '150px',
        "width": '100%'
      }
    },
    "contents": []
  };
  var $Container = $('<div class="visualAttributeContainer">' +
    '<div class="visualAttributeContainerHeader"></div>' +
    '<div class="visualAttributeContainerContent"></div>' +
  '</div>');
  $Container[0].customData = oContainer;
  return {
    data: oContainer,
    uiElement: $Container
  };
}

function createImageFrame(){
  var oImageFrame = {
    "id" : generateUUID(),
    "title" : "Image Frame",
    "type" : "image-frame",
    "properties" : {
      style: {
        'height': '150px'
      }
    },
    "data" : "",
    "contents" : []
  };
  var $Container = $('<div class="visualAttributeFrame">' +
    '<div class="visualAttributeFrameHeader"></div>' +
    '<div class="visualAttributeFrameContent"></div>' +
  '</div>');
  $Container[0].customData = oImageFrame;
  return {
    data: oImageFrame,
    uiElement: $Container
  }
}

function createTextFrame(){
  var oTextFrame = {
    "id" : generateUUID,
    "title" : "Text Frame",
    "data": "",
    "type" : "text-frame",
    "properties" : {
      style: {
        'height': '150px'
      }
    },
    "contents" : []
  };
  var $Container = $('<div class="visualAttributeFrame">' +
  '<div class="visualAttributeFrameHeader"></div>' +
  '<div class="visualAttributeFrameContent"></div>' +
  '</div>');
  $Container[0].customData = oTextFrame;
  return {
    data: oTextFrame,
    uiElement: $Container
  }
}

function generateUUID() {
  var iCurrentTimeStamp = new Date().getTime();

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var iRandom = (iCurrentTimeStamp + Math.random() * 16) % 16 | 0;

    iCurrentTimeStamp = Math.floor(iCurrentTimeStamp / 16);

    return (c == 'x' ? iRandom : (iRandom & 0x3 | 0x8)).toString(16);
  });

  return uuid;
}

function handleVisAttrDrop(oEvent){
  var oDroppedData = JSON.parse(oEvent.originalEvent.dataTransfer.getData('customData'));
  var $dropZone = $(oEvent.target);
  var oFrameData = null;
  if(oDroppedData.id == 'text-frame'){
    oFrameData = createTextFrame();
  } else if(oDroppedData.id == 'image-frame'){
    oFrameData = createImageFrame();
  } else if(oDroppedData.id == 'container'){
    oFrameData = createContainer();
  }
  aVisualAttributes.push(oFrameData.data);
  $dropZone.before(oFrameData.uiElement);
}