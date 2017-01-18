// Include React
var React = require("react");

// Creating the Login component
var Footer = React.createClass({	
	render: function() {
	    return (
	    	<div className="container" id="footer">Footer: Make me pretty!</div>
	    )
	}
});

// Export the component back for use in other files
module.exports = Footer;