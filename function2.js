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