"use strict";

describe("Github Event Service", function () {
  var GithubEvents, httpBackend;

  beforeEach(module("mainApp"));

  beforeEach(inject(function (_GithubEvents_, $httpBackend) {
    GithubEvents = _GithubEvents_;
    httpBackend = $httpBackend;
  }));

  it("should do something", function () {
    var test_data = [{
      "id": "2855897471",
      "type": "PushEvent",
      "created_at": "2015-06-02T12:25:51Z"
    }];

    httpBackend.whenGET("https://api.github.com/users/brianmehrman/events/public?page=1").respond(test_data);

    GithubEvents.query({username: 'brianmehrman', page: 1},function(data) {
      expect(data[0].id).toEqual(test_data[0].id);
    });
    httpBackend.flush();
  });

});
