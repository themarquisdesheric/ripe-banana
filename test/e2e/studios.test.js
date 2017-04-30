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

  let studio = { name: 'Universal', address: { city: 'Hollywood', state: 'Los Angeles', country: 'USA' } };

  it('POST should add a document', () => {
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

  it('PUT should update a document', () => {
    studio.name = 'Universal Studios';

    return request.put(`/studios/${studio._id}`)
      .send(studio)
      .then(res => res.body)
      .then(studio => assert.equal(studio.name, 'Universal Studios'));
  });

  // TODO: GET /studios/:id	 returns  { name, address, films: [ title ] }

  // TODO: studios cannot be deleted if there are films 

});