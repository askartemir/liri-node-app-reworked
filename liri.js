require("dotenv").config();

var keys = require("./keys.js");
//The Node.js file system module allow you to work with the file system on your computer.
//Common use for the File System module:
	//Read files
	//Create files
	//Update files
	//Delete files
	//Rename files
var fs = require("fs");
var request = require("request");

//Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

var nodeCommands = function() {
	if (command == "my-tweets"){
		var params = {screen_name: "Olli_Jones_III"};
		client.get("statuses/user_timeline", params, function(error, data, response) {
			if(!error){
				for (var i = 0; i < data.length && i < 20; i++) {
					console.log(data[i].text + "\n" + data[i].tweetedAt + "\n");
				}
			}
		});
	}

	else if(command == "spotify-this-song") {
		var song = process.argv[3] || "All the small things";
		if (song){
			console.log(song);
			spotify.search({type:"track", query: song},
				function(err, data){
					if(err){
						return console.log("There has been an error: " + err);
					}
					console.log("The artist's name: " + data.tracks.items[0].album.artists[0].name + "\n" + "Song name: " + song + "\n" + "Here is a preview track: " + data.tracks.items[0].preview_url + "\n" + "Album Name: " + data.tracks.items[0].album.name + "\n");
			});
		}
	
		else{
			spotify.search({type:"track", query: "The Sign"}, function(err2, data) {
				if(err2) {
					return console.log("Error encountered: " + err2);
				}
				else{
					console.log("The artist's name: " + data.tracks.items[0].album.artists[0].name + "\n" + "Song Name: " + song  + "\n" + "Here is a preview track: " + data.tracks.items[0].preview_url + "\n" + "Album Name: " + data.tracks.items[0].album.name);
				}
			});
		}
	}

	if(command == "movie-this") {
		var movie1 = process.argv;
		var movie = "";

		for(var i = 3; i < movie1.length; i++) {
			movie = movie + movie1[i];
		}
		var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
	

		if(movie) {
			request(queryUrl, function(err3, response, body) {
				if(!err3){
					console.log("This is the movie title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "Here is the IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors);
				}
			});
		}
		else {
			// if(!err3){
			// 	var queryURL = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
			// 	request(queryURL, function(error, response, body) {
			// 		console.log("This is the movie title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "Here is the IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors);
			// 	});
			// }
		}
	}

	if(command == "do-what-it-says"){
		fs.readFile("random.txt", "utf-8", function(err4, data) {
			if(err4) {
				return console.log(error);
			}
			var dataArray = data.split(",");
			spotify.search({type: "track", query: dataArray[1]}, function(err4, data) {
				if(err4) {
					return console.log("An error has occured: " + err4);
				}
				console.log("The artist's name: " + data.tracks.items[0].album.artists[0].name + "\n" + "Song Name: "+ dataArray[1] + "Here is a preview track: " + data.tracks.items[0].preview_url + "\n" + "Album Name: " + data.tracks.items[0].album.name);
			});
		});
	}
}

//call the nodeCommands function to use it
nodeCommands();




