var reqp = require('request-promise');
var expect = require("chai").expect;
var request=require('request');

function toJson(stringtoChange){
	return JSON.parse(stringtoChange);
}

describe("get requests for users", function(){
	it("gets all users", function() {
    request.get('http://localhost:1337/api/users').then(function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});