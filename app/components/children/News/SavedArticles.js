import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import { LoginLink } from 'react-stormpath';

// Include React Components
var NewsResult = require('./NewsResult');
var DeleteItem = require('./NewsItems/DeleteItem');


// Helper Function
var helpers = require('../../utils/helpers');

var SavedArticles = React.createClass({

	getInitialState: function(){
		return {
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	componentWillMount: function() {
		// Get saved articles
		helpers.getSaved()
			.then(function(data){
				// console.log(data)
				if (data === false) {
					// Show message if unable to delete
					this.message('Error','Unable to find articles. Please try again.');
				} else {
					// Save data to state
					this.setState({
						results: data
					});
				}
			}.bind(this))	
	},

  deleted: function(status) {
  	if (status === 'error') {
  		// Show successfully saved message
			this.message('Error','Article was unable to be deleted. Please try again.');
  	}
		return
  },

	// Here we render the function
	render: function(){

		var deleted = this.deleted;

		return(
			<div>
				<NewsResult fa="fa fa-download" text="Saved Articles">
		  		{this.state.results.map(function(result) {
			  		return (
			  			<DeleteItem 
			  				key={result._id}
			  				id={result._id}
			  				title={result.title}
			  				link={result.link}
			  				pubDate={result.pubDate}
			  				deleted={deleted}
			  			/>
			  		)
			  	})}
			  </NewsResult>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = SavedArticles;