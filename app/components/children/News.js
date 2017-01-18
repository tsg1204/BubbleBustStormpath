import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

var NewsNavigation = require("./News/NewsNavigation");

var NewsResult = require("./News/NewsResult");


// Creating the Login component
var News = React.createClass({	
	render: function() {
	    return (
            <div className="container">
                <NewsNavigation/>

                <NewsResult />

            </div>
	    )
	}
});

// Export the component back for use in other files
module.exports = News;