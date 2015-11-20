var myStore = require("./application-store");
var React = require('react');

var EditablePaperElementView =  React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  blur: function(e){
    var frameID = this.props.frameData.id;
    myStore.modifyTitle(frameID,e.target.textContent);
  },

  keyDown: function(e){
    var frameID = this.props.frameData.id;
    if(e.keyCode == 13){
      e.preventDefault();
      myStore.createNewFrame(e.target.textContent, frameID);
    }
    else if(e.keyCode == 8){
      if(e.target.textContent.length == 0){
        e.preventDefault();
        frameID = this.props.frameData.id;
        myStore.removeFrame(frameID);
      }
    }
    else if(e.keyCode == 9){
      e.preventDefault();
      if(e.shiftKey){
        myStore.makeParentAndAddSiblingsToChildren(e.target.textContent, frameID);
      } else {
        myStore.changeParentToContainerAndAddToParent(e.target.textContent, frameID);
      }
    }
  },

  componentDidUpdate: function(){
    this.setFocusOnFocussedElement();
  },

  componentDidMount: function(){
    this.setFocusOnFocussedElement();
  },

  setFocusOnFocussedElement: function(){
    var oCaretPosition =myStore.oCaretPosition;
    var fIndex = oCaretPosition.indexToFocus;
    var focussedId = oCaretPosition.focusId;
    if(focussedId && this.props.frameData.id == focussedId){
      var oTitleDOM = this.refs.editableTitleDiv;
      var oRange = document.createRange();
      if(fIndex == 99 && oTitleDOM.textContent.length > 0){
        fIndex = oTitleDOM.textContent.length;
        oRange.setStart(oTitleDOM.firstChild, fIndex);
        oRange.setEnd(oTitleDOM.firstChild, fIndex);
      }else if(fIndex == 99 && oTitleDOM.textContent.length == 0){
        oTitleDOM.focus();
        var breakFlag = true;
      }else{
        oRange.setStart(oTitleDOM, fIndex);
        oRange.setEnd(oTitleDOM, fIndex);
      }

      if(!breakFlag){
        var oSelection = window.getSelection();
        oSelection.removeAllRanges();
        oSelection.addRange(oRange);
      }
      myStore.setCaretPositionObjtoNull();

    }

  },


  handleClick: function(e){
    if(e.ctrlKey){

      this.getDOMNode().classList.add('ctrl-clickedFrame');
      myStore.setClickedFrameArray(this.props.frameData);
    }
    else{
      //myStore.setClickedFrameArray(null);
      myStore.setClickedFrame(this.props.frameData);
    }
  },

  render: function(){
    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditablePaperElementView frameData={oChildFrameData}/>
      );
    }
    return(
      <div className="paper-element">
        <div id={oFrameData.id}
          className="editable-text-div"
          ref="editableTitleDiv"
          data-uuid={oFrameData.id}
          contentEditable={true}
          onKeyDown={this.keyDown}
          onClick = {this.handleClick}
          onBlur={this.blur}>
            {oFrameData.title}
        </div>
        <div className="container-children">
          {aContainerContents}
        </div>
      </div>
    );
  }
});

module.exports = EditablePaperElementView;