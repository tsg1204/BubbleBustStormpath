/*Include the Axios library for HTTP requests*/
var axios = require('axios');
// Current base URL
var baseURL = window.location.origin;

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	saveArticle: function(article){

		var queryURL = baseURL + '/api/saved';

		return axios.post(queryURL, {
			'title': article.title,
	    	'pubDate': article.pubDate,
	    	'link': article.link
			})
			.then(function(res){
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	},

	getSaved: function(){

		var queryURL = baseURL + '/api/saved';

		return axios.get(queryURL)
			.then(function(res){
				if (res.status === 'error') return false;
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	},

	deleteSaved: function(id){

		var queryURL = baseURL + '/api/saved/' + id;

		return axios.delete(queryURL)
			.then(function(res){
				if (res.status === 'error') return false;
				return res.data;
			})
			.catch(function(err) {
				return false;
			})
	}

}

module.exports = helpers;
