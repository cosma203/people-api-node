const _ = require('lodash');
const { Router } = require('express');

const { Person, validatePerson } = require('../models/person');
const { joiValidate } = require('../middleware/joiValidate');
const { validateObjectId } = require('../middleware/objectid');

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const people = await Person.find({});

    res.send(people);
  })
  .post(joiValidate(validatePerson), async (req, res) => {
    const person = await Person.create(
      _.pick(req.body, ['name', 'surname', 'city', 'address', 'phone'])
    );

    res.send(person);
  });

router
  .route('/:id')
  .all(validateObjectId)
  .get(async (req, res) => {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send('Invalid id.');

    res.send(person);
  })
  .delete(async (req, res) => {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).send('Invalid id.');

    res.send(person);
  })
  .put(joiValidate(validatePerson), async (req, res) => {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, ['name', 'surname', 'city', 'address', 'phone']),
      { new: true }
    );
    if (!person) return res.status(404).send('Invalid id.');

    res.send(person);
  });

module.exports = {
  personRouter: router
};
