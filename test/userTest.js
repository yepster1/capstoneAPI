var reqp = require('request-promise');
var expect = require("chai").expect;
const request = require("request");
var assert = require("assert");
var reqp = require('request-promise');

function toJson(stringtoChange){
	return JSON.parse(stringtoChange);
}

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

describe("put requests for users", function(){
	it("changes users rating", function(done) {
	    reqp.post('http://localhost:1337/api/users/?username=cary&hashedPassword=pass&salt=salted').then(function(res) {
	      let result = toJson(res);
	      assert.equal("OK", result.status);
	      done();
		})
  	});

  // 	it("creates person that already exists", function(done) {
	 //    reqp.post('http://localhost:1337/api/users/?username=cary&hashedPassword=pass&salt=salted').then(function(res,err) {
	 //      if(err != null){
	 //      	console.log(err);
	 //      }
	 //      console.log(res);
	 //      //let result = toJson(res);
	 //      //assert.equal("Duplicate User error", result.error);
	 //      done();
		// })
  // 	});
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