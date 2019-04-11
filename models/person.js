const Joi = require('joi');
const moment = require('moment');
const { Schema, model } = require('mongoose');

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  createdDate: {
    type: String,
    default: moment().format('YYYY-MM-DD')
  }
});

const Person = model('person', personSchema);

function validatePerson(person) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(50)
      .trim(),
    surname: Joi.string()
      .required()
      .min(5)
      .max(50)
      .trim(),
    city: Joi.string()
      .required()
      .min(5)
      .max(50)
      .trim(),
    address: Joi.string()
      .required()
      .min(5)
      .max(50)
      .trim(),
    phone: Joi.string()
      .required()
      .regex(/\d{3}-\d{3}-\d{4}$/)
      .error(() => {
        return {
          message: 'Please enter a valid phone number (format: xxx-xxx-xxxx)'
        };
      }),
    createdDate: Joi.forbidden()
  };

  return Joi.validate(person, schema);
}

module.exports = {
  Person,
  validatePerson
};
