var React = require('react');

var EditableDeignView = React.createClass({

  propTypes:{
    frameData:React.PropTypes.object
  },

  render : function(){

    var oFrameData = this.props.frameData;
    var aContainerContents = [];
    for(var i = 0 ; i < oFrameData.contents.length ; i++){
      var oChildFrameData = oFrameData.contents[i];
      aContainerContents.push(
          <EditableDeignView frameData={oChildFrameData}/>
      );
    }

    return (
        <div className="design-element">
          <div id={oFrameData.id}
            className="design-text-div"
            ref="designTitleDiv"
            data-uuid={oFrameData.id}>
              {oFrameData.title}
            <div className="container-children">
            {aContainerContents}
            </div>
          </div>

        </div>
    );

  }





});

module.exports = EditableDeignView ;