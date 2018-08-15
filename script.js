

//1. Define a minimal set of properties available in the RequestReturnObject
// headers: Object
// status: Number
// url: String
// body: Object
// bodyText: String

const Promise = require('bluebird');
const _ = require('lodash');

const urls = [
  'http://site1.com/path',
  'http://site2.com/path',
  'http://test.com/path',
  'http://test2.com/path'
];

// NOTE: Assuming request.get and db.save returns a promise and Node version > 8
//2. save the response from every 'url' request
Promise.map(urls, async function(url) {
  const response = await request.get(url);
  // get the cookies sent back in the response
  const cookies = _.get(response.headers, 'set-cookie');
  // 3. if the request url is in the test.com domain, also print the results to stdout
  if (/[^]\/?\/?\.?test\.com/.test(url)) process.stdout.write(url);
  // save the response object along with a 'cookies' property which store the cookies sent with the response
  return db.save({ ...response, cookies });
})
  .catch(err => {
    console.log('there was an processing the request', JSON.stringify(err));
  });

//4. function to find url that tried to set cookie
async function findUrlsThatTriedToSetCookie() {
  const responses = await db.find('cookies', /[^null]/);
  return responses.map(response => response.url);
}



