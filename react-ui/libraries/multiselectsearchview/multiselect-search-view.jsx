var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

var DropDownListView = require('../dropdownlistview/drop-down-list-view.jsx');
var DropDownListModel = require('../dropdownlistview/model/drop-down-list-model.js');

var ListViewModel = require('../dropdownlistview/model/drop-down-list-model');
var MultiSelectSearchViewModel = require('./model/multiselect-search-view-model');

var MultiSelectStore = require('./multiselect-search-store');

var MultiSelectSearchView = React.createClass({

  store: null,

  propTypes: {
    model : React.PropTypes.instanceOf(MultiSelectSearchViewModel).isRequired
  },

  triggerChange: function(){
    this.setState({
      model:this.store.getState()
    });
  },

  keyDown: function(e){
    if(e.keyCode == 13 || e.keyCode == 8 || e.keyCode == 9){
      this.store.setDropDownVisible(false);
    }
    this.props.onKeyDown(e);

  },

  getDropDownListView: function () {
    var oModel = this.store.getState();
    var aListModel = this.store.isDropDownVisible() ? oModel.getDropDownListModel() : [];
    return (<DropDownListView dropDownListModel={aListModel}
                              handleOnClick={this.handleListNodeClicked}
                              maxHeight={this.state.model.getDropDownMaxHeight()}/>);
  },

  handleInputValueChanged: function (oEvent) {
    var oSelection = window.selection;
    if(oSelection){
      this.store.setLastSelectionRange(oSelection.range);
    }
    var sInputValue = oEvent.target.value;
    var sContextKey = this.state.model.getContext();
    //this.store.filterData(sInputValue);
    this.store.setSelectedModel([new DropDownListModel("Test1",sInputValue,true,{})]);
    this.triggerChange();
    //EventBus.dispatch(Events.MULTI_SEARCH_BAR_INPUT_VALUE_CHANGED, this, sContextKey, sInputValue);
    if(this.props.onChange){
      this.props.onChange(oEvent);
    }
  },

  canRaiseBlurEvent: function (oEvent) {
    var oNode = oEvent.target;
    //Check if event target is searchBarContainer
    //And its not any other multi-search context used anywhere else then don't blur
    while (oNode.parentNode) {
      if (oNode.classList[0] == "searchBarContainer") {
        if (this.state.model.getContext() == oNode.classList[1]) {
          return false;
        }
      }
      oNode = oNode.parentNode;
    }

    //Check if cross Icon is clicked then  also don't blur
    if (oEvent.target.className == 'crossIcon') {
       return false;
    }

    //Check if its not single select and target is dropDownNodeContainer then also don't blur
    if (!(this.state.model.getIsSingleSelect())) {
      if (oEvent.target.className == 'dropDownNodeContainer') {
        return false;
      }
    }

    //If clicked anywhere else then raise blur event
    return true;
  },

  handleListNodeClicked: function (oModel) {
    var sContextKey = this.state.model.getContext();
    if(oModel.getId() != "-1"){
      this.store.setSelectedModel([oModel]);
      this.store.setDropDownVisible(false);
      this.triggerChange();
      //EventBus.dispatch(Events.MULTI_SEARCH_DROP_DOWN_LIST_NODE_CLICKED, this, sContextKey, oModel);
      if(this.props.onNodeClick){
        this.props.onNodeClick(this,oModel);
      }
    }
  },

  handleInputBoxClicked: function (oEvent) {
    var oSelection = window.getSelection();
    var divInput = this.refs.multiSearchInputBox;
    var inputContainer = this.refs.searchBarContainer;
    if(this.state.model.getIsDisabled()
        || this.store.isDropDownVisible()
        || (oSelection.type=="Range" &&
        (oSelection.focusNode == divInput || oSelection.focusNode == inputContainer))){
      return;
    }
    this.store.setDropDownVisible(true);
    if (!divInput.value) {
      var sContextKey = this.state.model.getContext();
      //EventBus.dispatch(Events.MULTI_SEARCH_BAR_INPUT_BOX_CLICKED, this, sContextKey);
      document.addEventListener('click', this.handleInputBoxBlurred);
      if(this.props.onClick){
        this.props.onClick(this,sContextKey);
      }
    }
    this.triggerChange();
  },

  componentWillMount: function(){
    this.store = new MultiSelectStore();
    this.store.setData(this.props.model);
    this.triggerChange();
  },

  componentDidMount: function () {
    this.stateWiseRender();
  },

  componentDidUpdate: function () {
    this.stateWiseRender();
  },

  stateWiseRender: function () {
    var bActiveStatus = this.state.model.getIsActiveState();
    var thisComponent = this.getDOMNode();
    var iWidth = 25; // because x div width is hidden initially on hover its width get increases
    var aParentNode = $(thisComponent).find(".searchBarContainer");
    var oParentStyle = window.getComputedStyle(aParentNode[0], null);
    var iParentWidth = oParentStyle.getPropertyValue("width").split('px')[0] - 65; //-85 is morecontainer's width
    var bFlag = false;
    var aNodeList = $(thisComponent).find(".selectedItems");
    _.forEach(aNodeList, function (oNode, iIndex) {
      oNode.style.display = "inline-block";
    }.bind(this));

    if (bActiveStatus == false) {
      var divInput = this.refs.multiSearchInputBox;
      divInput.value = null;
      divInput.style.display = "none";
    }
    var aSelectedItems = this.state.model.getSelectedListModel();
    if(aSelectedItems.length){
      var divInput = this.refs.multiSearchInputBox;
      divInput.value = aSelectedItems[0].getName();
      var oSelectionRange = this.store.getLastSelectionRange();
      if(oSelectionRange){
        var oSelection = window.getSelection();
        oSelection.removeAllRanges();
        oSelection.addRange(oSelectionRange);
        this.store.setLastSelectionRange(null);
      }
    }
    if(this.store.isDropDownVisible()){
      document.addEventListener('click',this.blurDropDown);
    }
  },

  blurDropDown: function(oEvent){
    document.removeEventListener('click',this.blurDropDown);
    this.store.setDropDownVisible(false);
    this.triggerChange();
  },

  handleOnBlur: function(oEvent){
    if(this.props.onBlur){
      this.props.onBlur(oEvent);
    }
  },

  render: function () {
    this.store.setSelectedModel(this.props.selectedModel);
    var aDropDownList = this.getDropDownListView();
    var className= "searchBarContainer " + this.state.model.getContext();
    return (
        <div className="searchBarView">
          <div className={className} ref="searchBarContainer">
            <input ref="multiSearchInputBox"
                   className= "multiSearchInputBox"
                   onChange={this.handleInputValueChanged}
                  onKeyDown={this.keyDown}
            onClick={this.handleInputBoxClicked}
                />
          </div>
          {aDropDownList}
        </div>
    );
  }
});

module.exports = {
  view: MultiSelectSearchView
};
