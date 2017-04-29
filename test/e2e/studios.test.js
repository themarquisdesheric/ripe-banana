const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('studio API', () => {

  before(db.drop);

  it('initial GET should return empty array', () => {
    return request.get('/studios')
      .then(res => res.body)
      .then(studios => assert.deepEqual(studios, []));
  });

});