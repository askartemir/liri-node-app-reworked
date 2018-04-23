# liri-node-app-reworked
Reworked liri-node-app

This is a Language Interpretation and Recognition Interface application made with NodeJS.
This app takes in terminal commands and provides information in the terminal.
You can use this app with 4 different commands:

	"my-tweets"
	"spotify-this-song"
	"movie-this"
	"do-what-it-says"

How each of the commands work:
	
	"my-tweets" --> returns the most recent 20 tweets from a chosen Twitter account and shows that information in the Terminal.

	"spotify-this-song" --> when given a song name, the app will return important information about the song such as artist, preview link, and album it is from. This information is pulled using the Spotify-API. If no information is provided for the command, it will by default present "The Sign" by Ace of Base.

	"movie-this" --> when given a film name, the app will return information on the film using the OMDB-API. If no information is provided for the command, it will by default present to the film "Mr Nobody".

	"do-what-it-says" --> the app will use File System module to read in information from a file called random.txt and deliver that information into Spotify-API using Spotify command.