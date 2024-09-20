const request = require('request');
const { expect } = require('chai');

describe('Index page', () => {
  const API_URL = 'http://localhost:7865';

  it('correct status code', (done) => {
    request.get(API_URL, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('correct result', (done) => {
    request.get(API_URL, (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});

describe('Cart page', () => {
  const API_URL = 'http://localhost:7865';

  it('correct status code when :id is a number', (done) => {
    request.get(`${API_URL}/cart/12`, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('correct result when :id is a number', (done) => {
    request.get(`${API_URL}/cart/12`, (error, response, body) => {
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('correct status code when :id is NOT a number', (done) => {
    request.get(`${API_URL}/cart/hello`, (error, response) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

describe('Available payments', () => {
  const API_URL = 'http://localhost:7865';

  it('correct status code', (done) => {
    request.get(`${API_URL}/available_payments`, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('correct result', (done) => {
    request.get(`${API_URL}/available_payments`, (error, response, body) => {
      const expectedPayment = {
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      };
      expect(JSON.parse(body)).to.deep.equal(expectedPayment);
      done();
    });
  });
});

describe('Login', () => {
  const API_URL = 'http://localhost:7865';

  it('correct status code', (done) => {
    request.post({
      url: `${API_URL}/login`,
      json: { userName: 'Betty' }
    }, (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('correct result', (done) => {
    request.post({
      url: `${API_URL}/login`,
      json: { userName: 'Betty' }
    }, (error, response, body) => {
      expect(body).to.equal('Welcome Betty');
      done();
    });
  });
});