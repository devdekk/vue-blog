'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const APP_URL = 'http://localhost:8080/'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://localhost:3000/blog-posts"',
  AUTH0_CLIENT_ID: '"X3WrTSFAsLixFqDMQaX2ELKFlia9boti"',
  AUTH0_DOMAIN: '"devdekk.au.auth0.com"',
  AUTH0_LOGOUT_URL: `"${APP_URL}"`,
  AUTH0_CALLBACK_URL: `"${APP_URL}callback"`
})