var React = require('react');

var ListViewModel = require('./model/drop-down-list-model');
var _ = require('lodash');

var DropDownList = React.createClass({

  propTypes: {
    dropDownListModel: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ListViewModel)).isRequired,
    handleOnClick: React.PropTypes.func,
    maxHeight: React.PropTypes.number
  },

  onClickHandler: function (oModel) {
    this.props.handleOnClick(oModel);
  },

  getNodeView: function () {

    var aDropDownListModels = this.props.dropDownListModel;

    return _.map(aDropDownListModels, function (oModel, iIndex) {
      var sName = oModel.getName();
      return (<div className="dropDownNodeContainer"
                   onClick={this.onClickHandler.bind(this, oModel)}
                   key={sName + "_" + iIndex}>
        {sName}
      </div>);
    }.bind(this));
  },

  render: function () {

    var aNodeView = this.getNodeView();
    var sClassHide = aNodeView.length === 0 ? 'dropDownItemHidden' : '';
    var iMaxHeight = this.props.maxHeight;
    var iHeight = iMaxHeight ? iMaxHeight : 100;

    var oStyle = {
      maxHeight: iHeight
    };

    return (
        <div className={"dropDownListView " + sClassHide} style={oStyle}>
          {aNodeView}
        </div>
    );
  }

});

module.exports = DropDownList;
