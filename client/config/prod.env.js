'use strict'
const APP_URL = 'http://vue-blog-devdekk.s3-website-ap-southeast-2.amazonaws.com/'

module.exports = {
  NODE_ENV: '"production"',
  BACKEND_URL: '"https://ge356ruju4.execute-api.us-east-1.amazonaws.com/latest/blog-posts"',
  AUTH0_CLIENT_ID: '"QPBFXP4aInXkNoT45YDsTtqTcs1MHJ76"',
  AUTH0_DOMAIN: '"blog-prod.au.auth0.com"',
  AUTH0_LOGOUT_URL: `"${APP_URL}"`,
  AUTH0_CALLBACK_URL: `"${APP_URL}callback"`
}