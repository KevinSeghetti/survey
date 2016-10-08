var chai = require('chai')
import {default as UUID} from "node-uuid";

//===============================================================================

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
        <div className='checkbox-inline'>
            <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
            />
            {this.props.choice.description}
        </div>
    )
  }
})

//-------------------------------------------------------------------------------

export var RadioChoices = React.createClass({
  getInitialState: function() {
    return {selected: this.props.selected}
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
          <div
            key={ that.props.name + '_' + choice.name }
            className='radio-inline'
          >
            <label >
                <input type="radio"
                  value={choice.name}
                  checked={selected}
                  onChange={that.handleChange}
                ></input>
                {choice.description}
            </label>
          </div>
      )
    })
    return (
      <div className='form-group' >
        <label className="col-sm-4 control-label">{this.props.label}</label>
        <div className="col-sm-8">
            {choiceNodes}
        </div>
      </div>
    )
  }
})

//-------------------------------------------------------------------------------

export var TextField = React.createClass({
//  componentWillMount() {
//    this.id = UUID.v4();
//  },
  handleChange: function(event) {
    this.props.onUpdate(this.props, event.target.value)
  },
  render: function() {
    let value = (typeof this.props.value != 'undefined')?this.props.value:""
    return (
      <div className='form-group' >
        <label className="col-sm-4 control-label">{this.props.label}</label>
        <div className="col-sm-8">
            <input
              className='form-control'
              type="text"
              value={ value }
              onChange={this.handleChange}
            />
        </div>
      </div>
    )
  }
})

//-------------------------------------------------------------------------------

export var ClickableButton = React.createClass({
  handleChange: function(event) {
    this.props.handleClick(this.props, event.target.value)
  },
  render: function() {
    chai.expect(this.props.handleClick).to.exist
    return (
      <button
        onClick={this.handleChange}
        type="button"
        className="btn btn-default"
       >
          { this.props.value }
      </button>
    )
  },
})

//===============================================================================

