const bodyParser = require('body-parser');
const cors = require('cors');

const { personRouter } = require('../routes/persons');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/people', personRouter);
};
