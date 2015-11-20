var ListModel = function (sId, sName, bIsSelected, oProperties){

  this.getId = function(){
    return sId;
  };

  this.getName = function(){
    return sName;
  };

  this.getPropertyByName = function (oPropertyName) {
    return oProperties[oPropertyName];
  };

  this.toJSON = function () {
    return {
      "id": sId,
      "name": sName,
      "isSelected": bIsSelected,
      "properties": oProperties
    }
  };

};

module.exports = ListModel ;