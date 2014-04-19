var request = require('supertest')
  , app = require(__dirname + '/../app')

describe('GET /', function () {
  it('should contain text "Express"', function (done) {
     request(app)
       .get('/')
       .expect(/Express/, done)
  })
})