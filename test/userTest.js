var reqp = require('request-promise');
var expect = require("chai").expect;
const request = require("request");
var assert = require("assert");
var reqp = require('request-promise');

function toJson(stringtoChange){
	return JSON.parse(stringtoChange);
}

function createGame(id, myTeamAverageRating,otherAverageRating){
	return reqp.post('http://localhost:1337/api/games/?user='+id+'&myTeamAverageRating='+myTeamAverageRating+'&otherAverageRating='+otherAverageRating+')')
    .then(function (res) {
    	let result = toJson(res);
    	assert.equal(result.game.user, id);
    })
}

function createFriendPairing(user1, user2){
	return reqp.post('http://localhost:1337/api/friends/?user1='+user1+'&user2='+user2+')')
    .then(function (res) {
    	let result = toJson(res);
    	assert.equal(result.game.user, id);
    })
}

//user tests
describe("delete users", function(){
	it("deletes all users", function(done) {
	    reqp.delete('http://localhost:1337/api/users').then(function(res) {1
	      assert.equal("all users deleted!", res);
	      done();
		})
  });
});

describe("post requests for users", function(){
	it("creates person that doesn't already exist", function(done) {
	    reqp.post('http://localhost:1337/api/users/?username=cary&hashedPassword=pass&salt=salted').then(function(res) {
	      let result = toJson(res);
	      assert.equal("OK", result.status);
	      done();
		})
  	});

  	it("creates another person that doesn't exist", function(done) {
	    reqp.post('http://localhost:1337/api/users/?username=bob&hashedPassword=pass&salt=salted').then(function(res) {
	      let result = toJson(res);
	      assert.equal("OK", result.status);
	      done();
		})
  	});
});

describe("put requests for users", function(){
	it("changes users rating", function(done) {
	    reqp.put('http://localhost:1337/api/users/changeRating?username=cary&rating=1300').then(function(res) {
	      let result = toJson(res);
	      assert.equal("1300", result.user.rating);
	      done();
		})
  	});
});

describe("get requests for users", function(){
	it("gets all users", function(done) {
	    reqp.get('http://localhost:1337/api/users').then(function(res) {
	      let result = toJson(res);
	      assert.equal("cary", result[0].username);
	      done();
		})
  	});

	it("checks if user with username and password exist", function(done) {
	    reqp.get('http://localhost:1337/api/users/login?username=cary&password=pass').then(function(res) {
	      let result = toJson(res);
	      assert.equal("cary", result[0].username);
	      done();
		})
  });
});


//games test
describe("delete games", function(){
	it("deletes all games", function(done) {
	    reqp.delete('http://localhost:1337/api/games')
	    .then(function(res) {
	      assert.equal("all games deleted!", res);
	      done();
		})
  });
});

describe("post requests for Games", function(){
	it("creates games that doesn't already exist", function(done) {
		reqp.get('http://localhost:1337/api/users').then(function(res) {
		  let result = toJson(res);
	      createGame(result[0]._id,1200,1200)
	      .then(createGame(result[0]._id,1300,1200))
	      .then(createGame(result[0]._id,1200,1300))
	      .then(createGame(result[1]._id,1300,1200))
	      .then(createGame(result[1]._id,1200,1300))
	      .then(function(){
	      	done();
	      });
		})
  	});
});

describe("get requests for games", function(){
	it("gets all games", function(done) {
	    reqp.get('http://localhost:1337/api/games').then(function(res) {
	      let result = toJson(res);
	      assert.equal(5, result.length);
	      done();
		})
  	});

  	it("gets all games played by a certain player", function(done) {
  		reqp.get('http://localhost:1337/api/users').then(function(res) {
  			let result = toJson(res);
  			reqp.get('http://localhost:1337/api/games/myGames?user='+result[0]._id).then(function(ress) {
		      let result2 = toJson(ress);

		      result2.map(function(i) {
		      	console.log(i);
		      	assert.equal(i.user,result[0]._id);
		      })
		      done();
			})
  		});
	    
  	});
});

//friends tests

describe("delete friends", function(){
	it("deletes all friends", function(done) {
	    reqp.delete('http://localhost:1337/api/friends')
	    .then(function(res) {
	      assert.equal("all friends deleted!", res);
	      done();
		})
	});
});

describe("post requests for friends", function(){
	it("creates friend pairing", function(done) {
		reqp.get('http://localhost:1337/api/users').then(function(res) {
		  let result = toJson(res);
	      createFriendPairing(result[0]._id,result[1]._id)
	      .then(createFriendPairing(result[1]._id,result[0]._id))
	      .then(createFriendPairing(result[0]._id,result[0]._id))
	      .then(function(){
	      	done();
	      });
		})
  	});
});

describe("get requests for friends", function(){
	it("gets all friends", function(done) {
	    reqp.get('http://localhost:1337/api/friends').then(function(res) {
	      let result = toJson(res);
	      assert.equal(3, result.length);
	      done();
		})
  	});

  	it("gets all friends of a certain user",function(done){
  		reqp.get('http://localhost:1337/api/users').then(function(res) {
		  	let result = toJson(res);
	  		reqp.get('http://localhost:1337/api/myFriends?user='result[1]._id).then(function(res) {
		      let result2 = toJson(res);
		      assert.equal(2, result2.length);
		      done();
			})
		})
  	})
});

