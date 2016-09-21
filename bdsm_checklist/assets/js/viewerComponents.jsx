var log = require('./loggingConfig').CreateLogger("viewerComponents")

//===============================================================================

export var BooleanChoice = React.createClass({

    render: function() {
      log.info("BooleanChoice::render")
      var ghosted = "ghosted"
      if(this.props.answer)
      {
        ghosted='selected'
      }

      return (
          <div className={'question small ' + ghosted}>
              {this.props.choice.description}&nbsp;
          </div>
      );
    }
  });

//===============================================================================

export var RadioChoices = React.createClass({
    getInitialState: function() {
      return {selected: this.props.selected};
    },
    render: function() {
      log.info("RadioChoices:render",this.props)
      var choice = this.props.choices.find( x => x.name == this.props.selected) || { description: "?" }

      var rating = choice.description
      return (
        <div className='col-xs-2' >
          { rating }
        </div>
      );
    }
  });

//===============================================================================

export var TextField = React.createClass({
  render: function() {
    return (
      <div>
        { this.props.value }
      </div>
    );
  }
});

//===============================================================================


