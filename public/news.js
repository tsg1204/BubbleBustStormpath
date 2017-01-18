// SETUP VARIABLES
// ==========================================================
var allNews = [{ }];
var numResults 	= 0;
var queryURL;
var route;
var articleCounter = 0;

// FUNCTIONS
// ==========================================================
function saveArticle() {
	// When user click's save button, article will be saved to DB
	$(".btnSave").click(function(event) {
		var articleNumber = event.target.attributes[1].value;
		//console.log(event);
		// console.log($("#articleWell-"+ articleNumber)[0].children[0].children[0].innerText);
		// console.log($("#articleWell-"+ articleNumber)[0].children[0].children[1].children[1].href);
		// console.log($("#articleWell-"+ articleNumber)[0].children[1].innerText);

		var title = $("#articleWell-"+ articleNumber)[0].children[0].children[0].innerText;
		var link = $("#articleWell-"+ articleNumber)[0].children[0].children[1].children[1].href;
		var pubDate = $("#articleWell-"+ articleNumber)[0].children[1].innerText;

	  $.ajax({
	    type: "POST",
	    url: "/api/saved",
	    dataType: "json",
	    data: {
	      title: title,
	      link: link,
	      pubDate: pubDate
	    },
	    // On successful call
	    success: function(data) {
	      // Grab the results from the db again, to populate the DOM
	      //getResults();
	    }
	  });
	});	
}

function displayArticles() {
			// Initially sets the articleCounter to 0
		articleCounter = 0;
		//limit number of articles to 5
		numResults = 5;
		// Empties the region associated with the articles
		$("#wellSection").empty();

		//console.log(allNews);
		//console.log(allNews.length);
		for (var j=1; j<=numResults; j++) {

			// Add to the Article Counter (to make sure we show the right number)
			articleCounter++;

			// Create the HTML Well (Section) and Add the Article content for each
			var wellSection = $("<li>");
			wellSection.addClass('well');
			wellSection.addClass('list-group-item');
			wellSection.attr('id', 'articleWell-' + articleCounter)
			$('#wellSection').append(wellSection);

			$("#articleWell-"+ articleCounter).append('<h3 id="artTitle"><em>' 
												+ allNews[j].title + '</em><div class="btn-group pull-right"><button class="btn btn-primary btnSave" data-id=' 
												+ articleCounter + '>Save</button><a id="artLink" class="btn btn-default" href="' 
												+ allNews[j].url + '" target="_blank">View Article</a></div></h3>');
			if (allNews[j].publishedAt != null){
				$("#articleWell-"+ articleCounter).append('<p id="artDate">Date Published:  ' + allNews[j].publishedAt + '</p></li>');
			}	
			else {
				$("#articleWell-"+ articleCounter).append('<p id="artDate"> </p></li>');
			}

		}	
}

function displayScrapedArticles(scrapedNews) {
			// Initially sets the articleCounter to 0
		articleCounter = 0;
		//limit number of articles to 5
		numResults = 5;
		// Empties the region associated with the articles
		$("#wellSection").empty();

		//console.log(scrapedNews);
		//console.log(scrapedNews.length);
		for (var j=0; j<numResults; j++) {

			// Add to the Article Counter (to make sure we show the right number)
			articleCounter++;

			// Create the HTML Well (Section) and Add the Article content for each
			var wellSection = $("<li>");
			wellSection.addClass('well');
			wellSection.addClass('list-group-item');
			wellSection.attr('id', 'articleWell-' + articleCounter)
			$('#wellSection').append(wellSection);

			$("#articleWell-"+ articleCounter).append('<h3><em>' 
												+ scrapedNews[j].title + '</em><div class="btn-group pull-right"><button class="btn btn-primary btnSave" data-id=' 
												+ articleCounter + '>Save</button><a id="artLink" class="btn btn-default" href="' 
												+ scrapedNews[j].link + '" target="_blank">View Article</a></div></h3>');
			if (scrapedNews[j].pubDate !== '') {
				//here add logic to strip date out of the data for FOX News only!
				//work in progress

				$("#articleWell-"+ articleCounter).append('<p id="artDate">Date Published:  ' + scrapedNews[j].pubDate + '</p></li>');			
			}
			else {
				$("#articleWell-"+ articleCounter).append('<p id="artDate"> </p></li>');
			}			
		}	
}
// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL){
	numResults = 0;
	allNews = [{ }];
	// Then run a request to the news API 
	//request(queryURLBase, function (error, response, body) {
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(gardianNews) {
		// If the request is successful (i.e. if the response status code is 200)
		if ( gardianNews.status == 'ok') {

			numResults = numResults + Object.keys(gardianNews.articles).length;
			//console.log(numResults);
	
			allNews.push.apply(allNews, gardianNews.articles);		
		}
		//console.log(allNews);
		//show articles on the page
		displayArticles();

		//save article to DB
		saveArticle();
	});

}

//ajax to scrape for articles
function ajaxCall(route) {
	numResults = 0;
	var scrapedNews = [];
	//console.log(route);

	$.ajax({ type: "GET", 
		  	url: route, 
		    // On successful call
		    success: function(response) {
		    	//console.log(response);
				numResults = numResults + response.length;
				//console.log(numResults);
				scrapedNews.push(response);	
		    }
	})
		.done(function(scrapedNews) {
			//show scraped articles on the page
			displayScrapedArticles(scrapedNews);
			//save article to DB
			saveArticle();
		});
}

// METHODS
// ==========================================================
	
// On Click buttons associated with the Search Button
$('#runGuardian').on('click', function(){
	queryURL = 'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4';
	runQuery(numResults, queryURL);		
	return false;
});	
$('#runBBC').on('click', function(){
	queryURL = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4';
	runQuery(numResults, queryURL);		
	return false;
});
$('#runCNN').on('click', function(){
	queryURL = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=27b0fae587184d978804a9fe7727d8b4';
	runQuery(numResults, queryURL);		
	return false;
});
$('#runEconomist').on('click', function(){
	queryURL = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=latest&apiKey=27b0fae587184d978804a9fe7727d8b4';
	runQuery(numResults, queryURL);		
	return false;
});

//scraping part
$("#runNPR").on("click", function() {
	route = "/scrapeNPR";
	ajaxCall(route);
});

$("#runFOX").on("click", function() {
	route = "/scrapeFOX";
	ajaxCall(route);
});

$("#runHill").on("click", function() {
	route = "/scrapeHill";
	ajaxCall(route);
});

$("#runBlaze").on("click", function() {
	route = "/scrapeBlaze";
	ajaxCall(route);
});

$("#runHuffington").on("click", function() {
	route = "/scrapeHuff";
	ajaxCall(route);
});

// This button clears the top articles section
$('#clearAll').on('click', function(){
	articleCounter = 0;
	$("#wellSection").empty();
})



