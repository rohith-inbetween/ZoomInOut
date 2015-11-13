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

    $('.expanded').removeClass('expanded');

    var $title = $DOM.find('.templateTitle');
    $title.attr('contenteditable', $title.attr('contenteditable') === 'false');

    var $descriptionView = $DOM.find('.descriptionView');
    $descriptionView.slideToggle('slow');

   /* var oVisualAttribute = oDom.customData;
    var $expandedDOM = createExpandedTemplate(oVisualAttribute);
    $expandedDOM.hide();
    $(oDom).before($expandedDOM);
    *//*$(oDom).fadeOut("slow", function(){
      //$(this).replaceWith($expandedDOM);
      //$(oDom).fadeIn("slow");
    });*//*
    $(oDom).toggle("slow",function(){
      $(this).remove();
    });
    $expandedDOM.toggle("slow");*/
  });

  /*$('body').on('click', '.expanded', function (oEvent) {
    var oDom = oEvent.currentTarget;
    if($(oEvent.target).hasClass('.templateTitle')) {
      return;
    }
    var $DOM = $(oDom);

    var $descriptionView = $DOM.find('.descriptionView');
    $descriptionView.slideToggle('slow');
    *//*var oVisualAttribute = oDom.customData;
    var $collapsedDOM = createCollapsedTemplate(oVisualAttribute);

    $(oDom).fadeOut("slow", function(){
      $(this).replaceWith($collapsedDOM);
      $(oDom).fadeIn("slow");
    });*//*
  });*/

  $('body').on('click', '.expanded .templateTitle', function (oEvent) {
    oEvent.stopPropagation();
  });

});


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
    $dropZone.before(oFrameData);
    //$.event.trigger('resize',null,oFrameData,false);
  }
  //$dropZone.parents('.visualAttributeContainer').trigger('resize');
}

function createCollapsedTemplate(oContent) {
  var $template = $('<div class="templateContainer"></div>');

  var $header = $('<div class="templateHeader panel panel-default">' +
    '<div class="templateTitle" contenteditable="false">' + oContent.title + '</div>' +
  '</div>');

  var $tileView = $('<div class="tileView"></div>');
  if(oContent.type == 'text-frame') {
    $tileView.append('<div class="tileData">' + oContent.data + '</div>');
  } else if(oContent.type == 'image-frame'){
    $tileView.append('<div class="tileData"><img class="tileImage" src=' + oContent.data + ' /></div>');

  }
  $header.append($tileView);


  var $descriptionView = $('<div class="descriptionView" style="display: none;"></div>');
  if(oContent.type == 'text-frame') {
    $descriptionView.append('<div class="descriptionData"></div>');
  } else if(oContent.type == 'image-frame'){
    $descriptionView.append('<div class="descriptionData"><img class="describedImage" src=' + oContent.data + ' /></div>');

  }

  var $contentChildContainer = $('<div class="contentChildContainer"></div>');
  _.forEach(oContent.contents, function (oVisualAttribute) {
    $contentChildContainer.append(createCollapsedTemplate(oVisualAttribute));
  });

  $template.append($header);
  $template.append($descriptionView);
  $template.append($contentChildContainer);

  $template[0].customData = oContent;
  return $template;
}

function createExpandedTemplate(oContent) {
  var $template = $('<div class="templateContainer expanded"></div>');

  var $header = $('<div class="templateHeader panel panel-default">' +
    '<input class="templateTitle" value=' + oContent.title + '/>' +
  '</div>');

  var $bodyContainer = $('<div class="expandedBodyContainer"></div>');

  var $descriptionView = $('<div class="descriptionView"></div>');
  if(oContent.type == 'text-frame') {
    $descriptionView.append('<div class="descriptionData"></div>');
  } else if(oContent.type == 'image-frame'){
    $descriptionView.append('<div class="descriptionData"><img class="describedImage" src=' + oContent.data + ' /></div>');

  }

  var $contentChildContainer = $('<div class="contentChildContainer"></div>');
  _.forEach(oContent.contents, function (oVisualAttribute) {
    $contentChildContainer.append(createCollapsedTemplate(oVisualAttribute));
  });

  $template.append($header);
  $bodyContainer.append($descriptionView);
  $bodyContainer.append($contentChildContainer);
  $template.append($bodyContainer);

  $template[0].customData = oContent;
  return $template;
}
