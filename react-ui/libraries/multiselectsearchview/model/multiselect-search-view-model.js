var MultiSelectSearchViewModel = function (aDropDownListModel, aSelectedListModel, bIsActiveState, iDropDownMaxHeight, sContext, bIsSingleSelect, bIsDisabled) {

  this.getDropDownListModel = function () {
    return aDropDownListModel;
  };

  this.getSelectedListModel = function () {
    return aSelectedListModel;
  };

  this.getIsActiveState = function () {
    return bIsActiveState;
  };

  this.getDropDownMaxHeight = function () {
    return iDropDownMaxHeight || 0;
  };

  this.getContext = function () {
    return sContext;
  };

  this.getIsSingleSelect = function () {
    return bIsSingleSelect;
  };

  this.getIsDisabled = function () {
    return bIsDisabled;
  };

  this.toJSON = function () {

    return {
    dropDownListModel: aDropDownListModel,
    selectedListModel: aSelectedListModel ,
    isActiveState: bIsActiveState ,
    dropDownMaxHeight: iDropDownMaxHeight ,
    context: sContext,
    bIsSingleSelect: bIsSingleSelect,
    bIsDisabled : bIsDisabled
  }
};

};

module.exports = MultiSelectSearchViewModel;
