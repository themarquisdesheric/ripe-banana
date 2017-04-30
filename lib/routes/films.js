const Router = require('express').Router;
const router = Router();
const Film = require('../models/film');

router
  .get('/', (req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  });

module.exports = router;