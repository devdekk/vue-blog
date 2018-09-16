const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const auth0 = require('auth0');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const router = express.Router();

// These variables would change depending on dev/prod environment
// const { AUTH0_CLIENT_ID, AUTH0_DOMAIN, MONGODB_URL, BACKEND_URL } = process.env;

// dev env variables
const AUTH0_CLIENT_ID = 'X3WrTSFAsLixFqDMQaX2ELKFlia9boti';
const AUTH0_DOMAIN = 'devdekk.au.auth0.com';
const MONGODB_URL = 'mongodb://blog-db-user:blog_db_user_password1@ds157742.mlab.com:57742/blog';

// console.log('AUTH0_CLIENT_ID: ' + AUTH0_CLIENT_ID)
// console.log('AUTH0_DOMAIN: ' + AUTH0_DOMAIN)
// console.log('MONGODB_URL: ' + MONGODB_URL)

// retrieve latest blog-posts
router.get('/', async (req, res) => {
  const collection = await loadBlogPostsCollection();
  res.send(
    await collection.find({}).toArray()
  );
});

// setup jwt
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://blog-api',
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// insert a new blog-posts
router.post('/', checkJwt,  async (req, res) => {

  const collection = await loadBlogPostsCollection();

  const token = req.headers.authorization
    .replace('bearer ', '')
    .replace('Bearer ', '');

  const authClient = new auth0.AuthenticationClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });

  authClient.getProfile(token, async (err, userInfo) => {
    if (err) {
      return res.status(500).send(err);
    }

    await collection.insertOne({
      text: req.body.text,
      createdAt: new Date(),
      author: {
        sub: userInfo.sub,
        name: userInfo.name,
        picture: userInfo.picture,
      },
    });

    res.status(200).send();
  });
});

// 
async function loadBlogPostsCollection() {
  const client = await MongoClient.connect(MONGODB_URL);
  return client.db('blog').collection('blog-posts');
}

module.exports = router;