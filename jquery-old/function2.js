var aVisualAttributes = [];

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

  $('body').on('click', '.templateContainer .templateHeader', function (oEvent) {

    var oDom = oEvent.currentTarget;


    var $DOM = $(oDom).closest('.templateContainer');
    if($(oEvent.target).hasClass('.templateTitle')) {
      return;
    }
    var $previousExpanded = $('.expanded');
    if($previousExpanded[0] != $DOM[0]){
      handleFrameToggle($previousExpanded);
    }
    handleFrameToggle($DOM);

    oEvent.stopPropagation();
  });


  $('body').on('click', '.expanded .templateTitle', function (oEvent) {
    oEvent.stopPropagation();
  });

});


function handleFrameToggle($DOM) {
  $DOM.toggleClass('expanded');

  var $title = $DOM.find('.templateTitle:first');
  $title.attr('contenteditable', $title.attr('contenteditable') === 'false');

  var $descriptionView = $DOM.find('.descriptionView:first');
  $descriptionView.slideToggle('slow');
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

var _createVisualAttributeContainer = function(sTitle) {
  var container = {
    "id" : generateUUID(),
    "type" : "container",
    "title": sTitle ? sTitle : "Container",
    "properties" : {
      "sequence" : 0,
      "style": {
        "zIndex" : 0,
        "height" : '150px',
        "width" : '100%'
      }
    },
    "contents" : []
  };
  return container;
};

var _createTextFrameVisualAttribute = function() {
  var textFrame = {
    "id" : generateUUID(),
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
  return textFrame;
};

var _createImageFrameVisualAttribute = function() {
  var imageFrame = {
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
  return imageFrame;
};


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
  var oContent = null;
  if(oDroppedData.id == 'text-frame'){
    oContent = _createTextFrameVisualAttribute();
    oFrameData = createCollapsedTemplate(oContent);
  } else if(oDroppedData.id == 'image-frame'){
    oContent = _createImageFrameVisualAttribute();
    oFrameData = createCollapsedTemplate(oContent);
  } else if(oDroppedData.id == 'container'){
    oContent = _createVisualAttributeContainer();
    oFrameData = createCollapsedTemplate(oContent);
  }
  if(oFrameData) {
    aVisualAttributes.push(oContent);
    if($dropZone.hasClass('editorDropZone')){
      $dropZone.before(oFrameData);
    } else {
      $dropZone.siblings('.contentChildContainer').append(oFrameData);
    }
    //$.event.trigger('resize',null,oFrameData,false);
  }

  oEvent.stopPropagation();
  //$dropZone.parents('.visualAttributeContainer').trigger('resize');
}

function createCollapsedTemplate(oContent) {
  var $template = $('<div class="templateContainer"></div>');

  var $header = $('<div class="templateHeader panel panel-default">' +
    '<div class="templateTitle" contenteditable="false">' + oContent.title + '</div>' +
    '<div class="sectionMoreIcon"></div>' +
  '</div>');

  var $tileView = $('<div class="tileView"></div>');
  if(oContent.type == 'text-frame') {
    $tileView.append('<div class="tileData">' + oContent.data + '</div>');
  } else if(oContent.type == 'image-frame'){
    $tileView.append('<div class="tileData"><img class="tileImage"/></div>');
  }
  $header.append($tileView);
  $template.append($header);


  var $contentChildContainer = $('<div class="contentChildContainer"></div>');
  _.forEach(oContent.contents, function (oVisualAttribute) {
    $contentChildContainer.append(createCollapsedTemplate(oVisualAttribute));
  });

  var $descriptionView = $('<div class="descriptionView" style="display: none;"></div>');
  $template.append($descriptionView);

  if(oContent.type == 'text-frame') {
    var $descriptionData = $('<div class="descriptionData">' + oContent.data + '</div>');
    $descriptionView.append($descriptionData);
    $descriptionData.froalaEditor();
    $descriptionData.on('editable.contentChanged',setFroalaContent);
  } else if(oContent.type == 'image-frame'){
    $descriptionView.append('<div class="descriptionData">' +
      '<div class="addImageOption">' +
        '<input class="fileUpload" type="file" accept="image/*" style="display: none">' +
        '<div class="insert-image-button" title="Add Image"></div>' +
        '<div class="insert-image-label">Click to add image</div>' +
      '</div>' +
      '<img class="describedImage" style="display: none">' +
    '</div>');
    $descriptionView.find('.insert-image-button').on('click',function(oEvent){
      $(oEvent.target).siblings('.fileUpload').click();
    });
    $descriptionView.find('.fileUpload').on('change',setImage);
  } else if(oContent.type == 'container') {
    setDropEvents($descriptionView);
  }

  $template.append($contentChildContainer);

  $template[0].customData = oContent;
  return $template;
}

function setFroalaContent(e, editor){
  var $descriptionData = $(this);
  $descriptionData.closest('.templateContainer')[0].customData.data = $descriptionData.froalaEditor('html.get', true);
  $descriptionData.closest('.templateContainer').find('.tileData:first').html($descriptionData.froalaEditor('html.get', true));
}

function setImage(oEvent){
  console.log(oEvent);
  var $addImageOption = $(oEvent.target).closest('.addImageOption');
  $addImageOption.hide();
  var $imageDiv = $addImageOption.siblings('.describedImage');
  $imageDiv.show();
  var $tileImage = $addImageOption.closest('.descriptionView').siblings('.templateHeader').find('.tileImage');

  var oImageFiles = oEvent.target.files; // FileList object

  var oImageFile = oImageFiles[0];
  var oFileReader = new FileReader();

  oFileReader.onload = (function (file) {
    return function (e) {
      if (file.type.indexOf('image') != -1) {
        $imageDiv.attr('src', e.target.result);
        $tileImage.attr('src', e.target.result)
      }
    }
  })(oImageFile);

  oFileReader.readAsDataURL(oImageFile);
}
