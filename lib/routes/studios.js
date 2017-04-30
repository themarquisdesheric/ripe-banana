const Router = require('express').Router;
const router = Router();
const Studio = require('../models/studio');

router
  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Studio(req.body)
      .save()
      .then(studio => res.send(studio))
      .catch(next);
  });

module.exports = router;