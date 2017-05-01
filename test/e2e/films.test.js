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

  let waterWorld = { title: 'Waterworld', studio: '590643bc2cd3da2808b0e651', released: 1998 };

  it('POST should add a document', () => {
    return request.post('/films')
      .send(waterWorld)
      .then(res => res.body)
      .then(saved => {
        assert.ok(saved._id);

        waterWorld = saved;
      });
  });

  it('GET by id should return formatted document [{ title, studio.name }]', () => {
    return request.get(`/films/${waterWorld._id}`)
      .then(res => res.body)
      .then(film => {
        assert.propertyVal(film, 'title', 'Waterworld');
        assert.propertyVal(film, 'studio', 'Universal Studios');
      });
  });

});