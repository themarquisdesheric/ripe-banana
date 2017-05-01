const Router = require('express').Router;
const router = Router();
const Film = require('../models/film');

router
  .get('/', (req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Film(req.body)
      .save()
      .then(film => res.send(film))
      .catch(next);
  });

module.exports = router;