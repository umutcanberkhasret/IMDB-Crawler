# IMDB Crawler

This crawler scrapes IMDB's Top 250 Movies and TV Series along with the most popular movies. Scraped data can be stored in Mongo by adding related entries to .env file

	MONGO_USERNAME="username"
	MONGO_PASSWORD="password"
	DBNAME="Project Name in Mongodb"

Scraped data model:
-------------------
```json
{
   "_id":{
      "$oid":"6224d33f2c8a50b34d672071"
   },
   "imdbID":"tt0468569",
   "title":"The Dark Knight",
   "posterURL":"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX190_CR0,0,190,281_.jpg",
   "imdbRating":"9.1",
   "genres":[
      "Action",
      "Crime",
      "Drama",
      "Thriller"
   ],
   "productionYear":"2008",
   "duration":"2h 32m",
   "directors":[
      "Christopher Nolan"
   ],
   "stars":[
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Maggie Gyllenhaal",
      "Gary Oldman",
      "Morgan Freeman",
      "Monique Gabriela Curnen",
      "Ron Dean",
      "Cillian Murphy",
      "Chin Han",
      "Nestor Carbonell",
      "Eric Roberts",
      "Ritchie Coster",
      "Anthony Michael Hall",
      "Keith Szarabajka",
      "Colin McFarlane",
      "Joshua Harto"
   ],
   "filmDescription":"Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes. —Leon LombardiSet within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes. —Leon Lombardi"
}
```
