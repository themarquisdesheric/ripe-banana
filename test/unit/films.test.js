const assert = require('chai').assert;
const Film = require('../../lib/models/film');

describe('film model', () => {

  it('ensures invalid documents are not accepted', () => {
    return new Film().validate()
      .then(() => { throw new Error('Expected validation to fail'); },
      err => {
        const error = err.errors;

        assert.ok(error.released && error.released.kind === 'required');
        assert.ok(error.studio && error.studio.kind === 'required');
        assert.ok(error.title && error.title.kind === 'required');
      });
  });

});