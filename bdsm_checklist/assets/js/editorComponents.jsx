export var BooleanChoice = React.createClass({

  handleChange: function(event) {
    //console.log("BooleanChoice:handleChange:",event.target)
    //console.log("BooleanChoice:handleChange: props",this.props)
    this.props.onUpdate(this.props, !this.props.answer)
  },

  render: function() {
    var checked  = false
    if(this.props.answer)
    {
      checked=true
    }

    return (
        <div className='question small'>
            <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
            />
            {this.props.choice.description}
        </div>
    );
  }
});

export var RadioChoices = React.createClass({
  getInitialState: function() {
    return {selected: this.props.selected};
  },
  handleChange: function(event) {
    //console.log("RadioChange:handleChange")
    this.props.onUpdate(this.props, event.target.value)

  },
  render: function() {
    //console.log("RadioChoices:render",this.props)
    var that = this
    var choiceNodes = this.props.choices.map(function(choice) {
      var selected = that.props.selected == choice.name
      return (
          <span key={ that.props.name + '_' + choice.name }>
            <input type="radio"   value={choice.name}
              checked={selected}
              onChange={that.handleChange}
            ></input>
            <label >{choice.description}</label>
          </span>
      );
    });
    return (
      <div className='col-xs-10' >
        {choiceNodes}
      </div>
    );
  }
});


export var TextField = React.createClass({
  handleChange: function(event) {
    //console.log("TextField:handleChange")
    this.props.onUpdate(this.props, event.target.value)
  },
  render: function() {
    return (
      <input
        type="text"
        value={ this.props.value }
        onChange={this.handleChange}
      />
    );
  }
});



