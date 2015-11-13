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

function handleVisAttrDrop(oEvent){
  var oDroppedData = JSON.parse(oEvent.originalEvent.dataTransfer.getData('customData'));
  var $dropZone = $(oEvent.target);
  var oFrameData = null;
  if(oDroppedData.id == 'text-frame'){
    //oFrameData = createTextFrame();
  } else if(oDroppedData.id == 'image-frame'){
    //oFrameData = createImageFrame();
  } else if(oDroppedData.id == 'container'){
    //oFrameData = createContainer();
  }
  if(oFrameData) {
    aVisualAttributes.push(oFrameData.data);
    $dropZone.before(oFrameData.uiElement);
    $.event.trigger('resize',null,oFrameData.uiElement,false);
  }
  //$dropZone.parents('.visualAttributeContainer').trigger('resize');
}

