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

  let studio = { name: 'Universal', address: { city: 'Hollywood', state: 'CA', country: 'USA' } };
  // let film = { title: 'WaterWorld', studio: '590643bc2cd3da2808b0e651', released: 1998 };

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

  it('GET /studios/:id	 returns  { name, address, films: [ title ] }', () => {
    return request.get(`/studios/${studio._id}`)
      .then(res => res.body)
      .then(got => {
        console.log(got);

        assert.propertyVal(got, 'name', 'Universal Studios');
        assert.propertyVal(got.address, 'city', 'Hollywood');
        assert.propertyVal(got.address, 'state', 'CA');
        assert.propertyVal(got.address, 'country', 'USA');
        assert.propertyVal(got, 'film', 'WaterWorld');
      });
  });

  // TODO: studios cannot be deleted if there are films 

});