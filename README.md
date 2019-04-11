# People RESTFUL api

## Usage

- Clone the repo by using `git clone` or download the source code

- Run `npm install` on the cloned directory

- Run `npm start` to start the server on localhost:3900

- Run `npm test` to test the api endpoints

## API Endpoints

```
- GET http://localhost:3900/api/people // returns an array of person objects from the database

- GET http://locahost:3900/api/people/:id // returns a person object with an _id of :id

- POST http://localhost:3900/api/people // creates a new person object and returns it as a response
      * request body example: {
          name: Marko // type: String, minlength: 5, maxlength: 50, required,
          surname: Markovic // type: String, minlength: 5, maxlength: 50, required,
          city: Beograd // type: String, minlength: 5, maxlength: 50, required,
          address: Adresa 123 // type: String, minlength: 5, maxlength: 50, required,
          phone: 063-123-1234 // type: String, required, format: (xxx-xxx-xxxx)
        }

      * response body example: {
          _id: objectId,
          name: Marko,
          surname: Markovic,
          city: Beograd,
          address: Adresa 123,
          phone: 063-123-1234,
          createdDate: current date // type: String
        }

- DELETE http://locahost:3900/api/people/:id // deletes a person object with and _id of :id` and returns it as a response

- PUT http://locahost:3900/api/people/:id // updates a person object with an _id of :id and returns it as a response
```
