const Router = require('express').Router;
const router = Router();
const Studio = require('../models/studio');

router
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select('name')
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Studio(req.body)
      .save()
      .then(studio => res.send(studio))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Studio
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  });

module.exports = router;