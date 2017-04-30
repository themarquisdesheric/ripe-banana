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

  it('POST should add a document', () => {
    let studio = { name: 'Universal', address: { city: 'Hollywood', state: 'Los Angeles', country: 'USA' } };
    
    return request.post('/studios')
      .send(studio)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);

        studio = saved;
      });
  });

  it('GET should return just the name property of each document', () => {
    return request.get('/studios')
      .then(res => res.body)
      .then(studios => assert.notProperty(studios[0], 'address'));
  });

});