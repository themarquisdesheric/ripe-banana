const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('studio API', () => {

  before(db.drop);

  let testStudio = { name: 'MGM', address: { city: 'Hollywood', state: 'CA', country: 'USA' } };
  let film = { title: 'WaterWorld', studio: '590643bc2cd3da2808b0e651', released: 1998 };

  before(() => {
    return request.post('/studios')
      .send(testStudio)
      .then(res => res.body)
      .then(saved => testStudio = saved);
  });

  before(() => {
    film.studio = testStudio._id;

    return request.post('/films')
      .send(film)
      .then(res => res.body)
      .then(saved => film = saved);
  });

  let studio = { name: 'Universal', address: { city: 'Hollywood', state: 'CA', country: 'USA' } };

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
    return request.get(`/studios/${testStudio._id}`)
      .then(res => res.body)
      .then(got => {
        delete got._id;
        delete got.__v;
        assert.deepEqual(got, { name: 'MGM', films: [{ title: 'WaterWorld' }], address: { city: 'Hollywood', state: 'CA', country: 'USA' } });
      });
  });

  it('DELETE should remove studio if it does not have films', () => {
    return request.delete(`/studios/${studio._id}`)
      .then(res => res.body)
      .then(response => assert.isTrue(response.removed));
  });
  
  // TODO: studios cannot be deleted if there are films 
  
  // DO AFTER DELETE
  // it('GET should return empty array', () => {
  //   return request.get('/studios')
  //     .then(res => res.body)
  //     .then(studios => assert.deepEqual(studios, []));
  // });

});