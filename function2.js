$(document).ready(function(){

  var $VisAttrList = $('.visualAttributesListData');
  var aElements =_.map(aFrames, function(oVal){
    //var $oElement = $('<li draggable="true" class="visualAttributeDragElement active" data-id="oVal.id"><a>'+oVal.name+'</a></li>');
    var $oElement = $('<div draggable="true" class="panel panel-default visualAttributeDragElement">' +
      '<div class="panel-body">'+oVal.name+'</div>' +
    '</div>');
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
  if(oDroppedData.id == 'text-frame'){

  } else if(oDroppedData.id == 'image-frame'){

  } else if(oDroppedData.id == 'container'){

  }

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

