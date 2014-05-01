var request = require('supertest')
  , app = require(__dirname + '/../app')

describe('GET /', function () {
  it('should contain text "Чай Фай"', function (done) {
     request(app)
       .get('/')
       .expect(/Чай Фай/, done)
  })
})
