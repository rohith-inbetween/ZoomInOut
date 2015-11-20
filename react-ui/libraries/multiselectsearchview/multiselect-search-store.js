var _ = require('lodash');
var MultiSelectSearchViewModel = require('./model/multiselect-search-view-model');


var MultiSelectStore = function(){

  var dropDownModels = null;
  var selectedModel = null;
  var bIsActiveState = false;
  var iDropDownMaxHeight = 100;
  var bIsSingleSelect = true;
  var bIsDisabled = false;
  var bIsDropDownVisible = false;

  var lastSelectionRange = null;

  this.setData = function(oModel){
    dropDownModels = oModel.getDropDownListModel();
    selectedModel = oModel.getSelectedListModel();
    bIsActiveState = oModel.getIsActiveState();
    iDropDownMaxHeight = oModel.getDropDownMaxHeight();
    bIsSingleSelect = oModel.getIsSingleSelect();
    bIsDisabled = oModel.getIsDisabled();
  };

  this.setSelectedModel = function(oSelectedModel){
    selectedModel = oSelectedModel;
  };

  this.getState = function(){
    var sSelected = "";
    if(selectedModel.length){
      sSelected = selectedModel[0].getName();
    }
    var aVisibleModels = _.filter(dropDownModels,function(oDropDownModel){
      return oDropDownModel.getName().indexOf(sSelected) >= 0;
    });
    return new MultiSelectSearchViewModel(aVisibleModels,
        selectedModel, bIsActiveState, iDropDownMaxHeight, "ABCD" ,bIsSingleSelect, bIsDisabled);
  };

  this.isDropDownVisible = function(){
    return bIsDropDownVisible;
  };

  this.setDropDownVisible = function(dropDownVisible){
    bIsDropDownVisible = dropDownVisible;
  };

  this.getLastSelectionRange = function(){
    return lastSelectionRange;
  };

  this.setLastSelectionRange = function(oSelectionRange){
    lastSelectionRange = oSelectionRange;
  }

};

module.exports = MultiSelectStore;