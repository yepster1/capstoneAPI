commands:

GET:
	http://localhost:1337/api/users - gets all the users 
	http://localhost:1337/api/users/login?username=cary&password=hardware	- gets whether the person with the name and password. used to check if they exist
	http://localhost:1337/api/games - gets all games
POST:
	http://localhost:1337/api/users/?username=cary&hashedPassword=hardware&salt=salted - adds user with parameters above. hashing and salting will be done in the client
	http://localhost:1337/api/games/?user=59ca5b3245b6661fd7b7075f&myTeamAverageRating=0&otherAverageRating=0	- creates a game that the user was part 
