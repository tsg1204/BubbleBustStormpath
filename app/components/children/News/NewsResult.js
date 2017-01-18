import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

var SaveItem = require('./NewsItems/SaveItem');
// Helper Function
var helpers = require('../../utils/helpers');


// Creating the Login component
var NewsResult = React.createClass({	

    getInitialState: function(){
        return {
            results: [],
            modalIsOpen: false,
            type: "",
            message: ""
        }
    },

    // This function will respond to the user click
    handleClick: function(event){

            // Search for articles
            helpers.getSaved()
                .then(function(data){
                    if (data === false) {
                        // Show message if no results found
                        this.message('Error','No results found. Please refine inputs.');
                    } else {
                        // Save data to state
                        this.setState({
                            results: data
                        });
                    }
                }.bind(this))       
    },

    saved: function(status) {
        if (status === 'saved') {
        // Show successfully saved message
            this.message('Successfully Saved','Click "Saved Articles" in navigation to review.');
        } else {
        // Show successfully saved message
            this.message('Error','Article was already saved.');
        }
        return
    },

	render: function() {
	    return (

                <div className="panel-body">
                    <ul className="list-group" id="wellSection">

                        {this.props.children}

                    </ul>
                </div>
	    )
	}
});

// Export the component back for use in other files
module.exports = NewsResult;
