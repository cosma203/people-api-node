const request = require('supertest');
const expect = require('expect');
const { Types } = require('mongoose');

const { Person } = require('../models/person');
const { app } = require('../index');

const personId1 = new Types.ObjectId();
const personId2 = new Types.ObjectId();
const unknownId = new Types.ObjectId();

let id, name, surname, city, address, phone, exec, res;

beforeEach(async () => {
  await Person.insertMany([
    {
      _id: personId1,
      name: 'Milos',
      surname: 'Petrovic',
      city: 'City 1',
      address: 'Address 1',
      phone: '123-123-1234'
    },
    {
      _id: personId2,
      name: 'Milan',
      surname: 'Djordjevic',
      city: 'City 2',
      address: 'Address 2',
      phone: '123-123-1234'
    }
  ]);
});

afterEach(async () => {
  await Person.deleteMany();
});

describe('GET /', () => {
  it('should return all the people in the database', async () => {
    res = await request(app).get('/api/people');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe('POST /', () => {
  beforeEach(() => {
    name = 'Marko';
    surname = 'Markovic';
    city = 'City 3';
    address = 'Address 3';
    phone = '123-123-1234';
    exec = async () => {
      return await request(app)
        .post('/api/people')
        .send({
          name,
          surname,
          city,
          address,
          phone
        });
    };
  });

  it('should return 400 if name is not provided', async () => {
    name = '';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name length is less than 5 characters long', async () => {
    name = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name length is more than 50 characters long', async () => {
    name = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname is not provided', async () => {
    surname = '';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname length is less than 5 characters long', async () => {
    surname = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname length is more than 50 characters long', async () => {
    surname = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city is not provided', async () => {
    city = '';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city name length is less than 5 characters long', async () => {
    city = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city name length is more than 50 characters long', async () => {
    city = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address is not provided', async () => {
    address = '';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address length is less than 5 characters long', async () => {
    address = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address length is more than 50 characters long', async () => {
    address = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if phone is not provided', async () => {
    phone = '';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200,create a new person and save it to the database', async () => {
    res = await exec();

    const person = await Person.findOne({ name });

    expect(res.status).toBe(200);
    expect(person).toBeTruthy();
  });
});

describe('GET /:id', () => {
  beforeEach(() => {
    id = personId1;
    exec = async () => {
      return await request(app).get(`/api/people/${id}`);
    };
  });

  it('should return 400 if id is not a valid object id', async () => {
    id = '123';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 404 if person with the given id does not exist in the database', async () => {
    id = unknownId;
    res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 200 and the person with the given id in the database', async () => {
    res = await exec();

    const person = await Person.findById(id);

    expect(res.status).toBe(200);
    expect(person).toBeTruthy();
  });
});

describe('DELETE /:id', () => {
  beforeEach(() => {
    id = personId1;
    exec = async () => {
      return await request(app).delete(`/api/people/${id}`);
    };
  });

  it('should return 400 if id is not a valid object id', async () => {
    id = '123';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 404 if person with the given id does not exist in the database', async () => {
    id = unknownId;
    res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 200 and delete the person with the given id from the database', async () => {
    res = await exec();

    const person = await Person.findById(id);

    expect(res.status).toBe(200);
    expect(person).toBeFalsy();
  });
});

describe('PUT /:id', () => {
  beforeEach(() => {
    id = personId1;
    name = 'Marko';
    surname = 'Markovic';
    city = 'City 3';
    address = 'Address 3';
    phone = '123-123-1234';
    exec = async () => {
      return await request(app)
        .put(`/api/people/${id}`)
        .send({
          name,
          surname,
          city,
          address,
          phone
        });
    };
  });

  it('should return 400 if id is not a valid object id', async () => {
    id = '123';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 404 if person with the given id does not exist in the database', async () => {
    id = unknownId;
    res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 400 if name is not provided', async () => {
    name = '';

    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name length is less than 5 characters long', async () => {
    name = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if name length is more than 50 characters long', async () => {
    name = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname is not provided', async () => {
    surname = '';

    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname length is less than 5 characters long', async () => {
    surname = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if surname length is more than 50 characters long', async () => {
    surname = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city is not provided', async () => {
    city = '';

    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city name length is less than 5 characters long', async () => {
    city = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if city name length is more than 50 characters long', async () => {
    city = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address is not provided', async () => {
    address = '';

    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address length is less than 5 characters long', async () => {
    address = 'abcd';
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if address length is more than 50 characters long', async () => {
    address = new Array(52).join('a');
    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if phone is not provided', async () => {
    phone = '';

    res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 and update the person with the given id in the database', async () => {
    res = await exec();

    const person = await Person.findById(id);

    expect(res.status).toBe(200);
    expect(person).toBeTruthy();
    expect(person.name).toBe(name);
  });
});
