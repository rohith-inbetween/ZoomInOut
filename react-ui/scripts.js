var aContentList = ["Apple", "Bag", "Balloon", "Bed", "Beef", "Blanket", "Blouse", "Book", "Bookmark", "Bottle", "Bread", "Brocolli", "Button", "Camera", "Candle", "Candy Wrapper", "Car", "Carrots", "Cd", "Chalk", "Clay Pot", "Clock", "Coasters", "Conditioner", "Controller", "Cookie Jar", "Couch", "Deodorant", "Desk", "Doll", "Door", "Drawer", "Drill Press", "Face Wash", "Fake Flowers", "Floor", "Glass", "Grid Paper", "Hair Brush", "Hanger", "House", "Ipod", "Keyboard", "Lamp", "Lamp Shade", "Lotion", "Milk", "Mirror", "Model Car", "Money", "Mop", "Mouse Pad", "Mp3 Player", "Nail Clippers", "Needle", "Outlet", "Packing Peanuts", "Paint Brush", "Pants", "Paper", "Perfume", "Photo Album", "Plastic Fork", "Playing Card", "Purse", "Ring", "Rubber Duck", "Rug", "Rusty Nail", "Sand Paper", "Sandal", "Seat Belt", "Sharpie", "Shirt", "Shovel", "Sidewalk", "Soap", "Soda Can", "Sofa", "Speakers", "Sponge", "Spoon", "Stockings", "Stop Sign", "Sun Glasses", "Teddies", "Thermometer", "Tire Swing", "Tissue Box", "Toe Ring", "Tomato", "Toothpaste", "Twezzers", "Twister", "Vase", "Wagon", "Wallet", "Watch", "White Out", "Window"];

$(document).ready(function() {
  $('select').material_select();

  $('body').on('click', '.rel', function(event){

    if($(event.target).hasClass('contentRemove')){
      return;
    }

    var $availableContents = $('.availableContents');
    var $relationshipsCont = $('.relationships');
    var $mainCont = $('.mainContainer');
    var bAvailableContentsVisibility = $availableContents.hasClass('visible');
   /* if(bAvailableContentsVisibility){
      $availableContents.removeClass('visible');
      $relationshipsCont.removeClass('half');
    }else{*/
      $availableContents.addClass('visible');
      $mainCont.addClass('half');
    //}

    $('.rel').removeClass('relSelected');
    $(this).addClass('relSelected');

    //var iIndex = $(this).index();
    //var iScrollTop = iIndex * 260;

    //$relationshipsCont.animate({scrollTop: iScrollTop}, 200);
    var scrollTop = $(this).offset().top - $(".paper1").offset().top;
    $('.mainContainer').animate({scrollTop: scrollTop + 10}, 200);

    var $this = $(this);
    setTimeout(function(){
      var scrollTop = $this.offset().top - $(".paper1").offset().top;
      $('.mainContainer').animate({scrollTop: scrollTop + 10}, 200);
    }, 200);
  });

  $('.availableClose').on('click', function(){
    var $availableContents = $('.availableContents');
    var $mainCont = $('.mainContainer');
    $availableContents.removeClass('visible');
    $mainCont.removeClass('half');
    $('.rel').removeClass('relSelected');
  });

  var $availableBody = $('.availableBody');

  for(var i=0; i<aContentList.length; i++){

    if(i == 0){
      $availableBody.append(getSplitterDom('A'));
    }else{
      if(aContentList[i-1][0] != aContentList[i][0]){
        $availableBody.find('.contentWrapper:last-child').addClass('noBottomBorder');
        $availableBody.append(getSplitterDom(aContentList[i][0]));
      }
    }
    var $content = getContentDom(aContentList[i]);

    $availableBody.append($content)
  }


  /*******IP********/
  var $customInput = $('.dropdowninput');

  $('.customIp').on('click', function(event){

    var $myDropDown = $(this).parents('.dropDownView').find('.dropdown');

    if(!$(event.target).hasClass('removeSelected')){
      event.stopPropagation();
    }

    $('.dropdown').not($myDropDown).hide();

    $(this).find('input').show().focus();

    if(!$myDropDown.is(':visible')){
      $myDropDown.slideDown(200, 'easeOutCubic');
    }

    $(this).parents('.dropDownView').removeClass('nothingSelected');

  });

  $customInput.on('keyup', function(){

    var val = $(this).val().toLocaleLowerCase();
    var $dropItems = $(this).parents('.dropDownView').find('.dropItem');
    $dropItems.show();

    if(val.trim() == ""){

    }else{
      for(var i=0; i<$dropItems.length; i++){
        var label = $dropItems.eq(i).html().toLocaleLowerCase();
        if(label.indexOf(val) == -1){
          $dropItems.eq(i).hide();
        }
      }
    }
  });

  $('.dropItem').on('click', function(event){
    event.stopPropagation();
    var val = $(this).find('.dropItemText').html();
    var itemId = $(this).attr('data-id');
    var $myDropDownView = $(this).parents('.dropDownView');
    //$(this).parents('.dropdown').hide();

    var $alreadyExists = $myDropDownView.find('.selectedItem[data-id="' + itemId +'"]');
    if($alreadyExists.length > 0){
      $alreadyExists.remove();
    }else{
      $myDropDownView.find('.selectedItems').append(getSelectedItemDom(val, itemId));
    }
    $myDropDownView.find('.dropdowninput').val('');
    $myDropDownView.find('.dropItem').show();
    $(this).toggleClass('selected');

    addRemoveNothingSelectedClass($myDropDownView);
  });

  $('body').on('click', '.removeSelected' ,function(event){
    event.stopPropagation();

    var iId = $(this).parents('.selectedItem').attr('data-id');
    var $myDropDownView = $(this).parents('.dropDownView');
    $myDropDownView.find('.dropItem[data-id="' + iId + '"]').removeClass('selected');

    $(this).parents('.selectedItem').remove();
    addRemoveNothingSelectedClass($myDropDownView);
  });

  $(document).click(function(){
    var $dropDown = $('.dropdown');
    var $dropDownView = $('.dropDownView');
    $dropDown.slideUp(200, 'easeOutCubic');

    for(var i=0; i<$dropDownView.length; i++){
      addRemoveNothingSelectedClass($dropDownView.eq(i), true);
    }

    $('.availableSearch').removeClass('searchActive');
  });

  $('.searchInput').on('keyup', function(){
    var sVal = $(this).val().toLocaleLowerCase();
    var $contents = $('.availableBody').find('.contentWrapper');
    var $splitters = $('.availableBody').find('.splitter');

    if(sVal.trim() == ""){
      $contents.slideDown(200, 'easeOutCubic');
    }else{
      for(var i=0; i<$contents.length; i++){
        var sContentName = $contents.eq(i).find('.contentBody').html().toLocaleLowerCase();

        if(sContentName.indexOf(sVal) != -1){
          $contents.eq(i).show();
        }else{
          $contents.eq(i).hide();
        }
      }
    }

    $splitters.show();
    for(var j=0; j<$splitters.length; j++){
      if($splitters.eq(j).nextAll(':visible').eq(0).hasClass('contentWrapper')){
        $splitters.eq(j).show();
      }else{
        $splitters.eq(j).hide();
      }
    }
  });

  createRelationshipsDom();

  $('body').on('click', '.contentRemove', function(){
    $(this).parents('.contentWrapper').slideUp(100, 'easeOutCubic', function(){
      $(this).remove();
    })
  });

  $('.searchInput').on('click', function(event){
    event.stopPropagation();
    $(this).parents('.availableSearch').addClass('searchActive');
  });
});

function addRemoveNothingSelectedClass($myDropDownView, flag){
  if(($myDropDownView.find('.selectedItem').length == 0 && flag) || ($myDropDownView.find('.selectedItem').length == 0 && !$myDropDownView.find('.dropdown').is(':visible'))){
    $myDropDownView.addClass('nothingSelected');
  }else{
    $myDropDownView.removeClass('nothingSelected');
  }
}

function getSelectedItemDom(sName, iId){
  return $('<div class="selectedItem" data-id="' + iId + '"><div class="selectedString">'+ sName +'</div><div class="removeSelected"></div></div>')
}

function getSplitterDom(sName){

  return $('<div class="splitter">' + sName + '</div>')
}

function getContentDom(sName){
  var $dom = $('<div class="contentWrapper">' +
  '<div class="contentImage"></div><div class="contentBody">' + sName + '</div>' +
  '</div>');

  return $dom;
}

function createRelationshipsDom(){
  var aRelMock = aMockRelationships;
  var $container = $('.relationships');

  for(var i=0; i<aRelMock.length; i++){

    var $contentWrapper = $('<div class="relBody"></div>');
    for(var j=0; j<aRelMock[i].contents.length; j++){
      $contentWrapper.append(createRelContentDom(aRelMock[i].contents[j].name, aRelMock[i].contents[j].description));
    }

    var $relHeader = $('<div class="relHeader">' + aRelMock[i].name + '</div>');
    var $relCont = $('<div class="rel rel' + i +'"></div>');
    $relCont.append($relHeader);
    $relCont.append($contentWrapper);
    $container.append($relCont);
  }
}

function createRelContentDom(sName, sDescription){

  return $(
  '<div class="contentWrapper">' +
    '<div class="contentBody">' +
      '<div class="contentHeader">' + sName + '</div>' +
      '<div class="contentDescription">' + sDescription + '</div>' +
    '</div>' +
    '<div class="contentImage"></div>' +
    '<div class="contentRemove" title="Remove Content from Relationship"></div>' +
  '</div>'
  )
}