const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('film API', () => {

  before(db.drop);

  it('initial GET should return empty array', () => {
    return request.get('/films')
      .then(res => res.body)
      .then(films => assert.deepEqual(films, []));
  });

});