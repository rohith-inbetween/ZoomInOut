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
  setDropEvents($EditorDropZone);

  $('.visualAttributeDragElement').on({
    dragstart: function(oEvent){
      oEvent.originalEvent.dataTransfer.setData('customData',JSON.stringify(oEvent.target.customData));
    },
    dragend: function(oEvent){
    }
  });

  $('body').on('click', '.splitter', function (oEvent) {
    var $target = $(oEvent.target);
    console.log($target.attr('data-container'));
    console.log($target.attr('data-value'));
  });

});

function setDropEvents($EditorDropZone){
  $EditorDropZone.on({
    drop: handleVisAttrDrop,
    dragover: function(oEvent){
      oEvent.preventDefault();
    },
    dragleave: function(oEvent){
    }
  });
}

function setResizeEvent($frameContainer){
  $frameContainer.on({
    resize: function(oEvent){
      console.log("Resize");
      console.log(oEvent);
      console.log(oEvent.target);
    }
  });

}

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
  var sContainerId = oContainer.id;

  var $Container = $('<div class="visualAttributeContainer" data-id=' + sContainerId + '>' +
    '<div class="visualAttributeContainerHeader">' +
      '<div class="containerTitle"><div class="titleInput">Container</div></div>' +
      '<div class="containerTools">' +
        '<div class="splitter" data-container=' + sContainerId + ' data-value="1">1</div>' +
        '<div class="splitter" data-container=' + sContainerId + ' data-value="2">2</div>' +
        '<div class="splitter" data-container=' + sContainerId + ' data-value="3">3</div>' +
        '<div class="splitter" data-container=' + sContainerId + ' data-value="4">4</div>' +
      '</div>' +
    '</div>' +
    '<div class="visualAttributeContainerContent">' +
      '<div class="editorDropZone"></div>' +
    '</div>' +
  '</div>');
  $Container[0].customData = oContainer;
  setDropEvents($Container.find('.editorDropZone'));
  setResizeEvent($Container.find('.visualAttributeContainerContent'));
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
    '<div class="visualAttributeFrameHeader"><div class="titleInput">Image Frame</div></div>' +
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
  '<div class="visualAttributeFrameHeader"><div class="titleInput">Text Frame</div></div>' +
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
  $.event.trigger('resize',null,oFrameData.uiElement,false);
  //$dropZone.parents('.visualAttributeContainer').trigger('resize');
}