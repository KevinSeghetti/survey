var React = require('react')
var $ = require('jquery')

module.exports = React.createClass({
   render: function(){
       return <div>
            <h1>Hello, world.!!</h1>
            You are running jQuery version: { $.fn.jquery }
        </div>
   }
})
