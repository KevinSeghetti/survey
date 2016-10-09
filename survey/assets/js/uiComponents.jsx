
var chai = require('chai')
var log = require('./loggingConfig').CreateLogger("uiComponents")

//===============================================================================

export var LinkButton = React.createClass({
  handleChange: function(event) {
    this.props.handleClick(this.props, event.target.value)
  },
  render: function() {
    chai.expect(this.props.handleClick).to.exist
    let icon = ""
    if(this.props.icon)
    {
        icon = <span className ={"glyphicon " + this.props.icon} aria-hidden="true"></span>
    }
    return (
      <a href="javascript: void(0)"
        onClick={this.handleChange}
        className=""
       >
          {icon} { this.props.value }
      </a>
    )
  },
})

//===============================================================================



