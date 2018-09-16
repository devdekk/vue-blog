# vue-blog
A Blog style Vuejs application that uses Auth0 to authenticate user login/logout. 
Blog data is stored and retrieved from MongoDB database. 
(** Deployed to AWS - issue with Lambda API getting called from bucket **)


Step to run locally:
- Copy down vue-blog folder
- Open command line and point to vue-blog/server folder on machine
- Run 'npm install' to node_modules
- Run 'node src/development-server' to start up nodejs/express server
- Open command line and point to vue-blog/client folder on machine
- Run 'npm install' to node_modules
- Run 'npm start' to run Vuejs application locally at localhost:8080

Steps I took to deploy to AWS:
- Created a new tenant, single page application and API on Auth0 for production details.
- Created an AWS account and copied down details to .aws/credentials folder.
- Wrapped my express API with a AWS Lambda wrapper which is link between express and AWS Lambda.
- Deployed my express API to AWS Lambda using Claudia.js (Issue retrieving data from this API - I think it has to do with how the JSON data is being parsed)
- Ran 'npm run build' on client folder and copied dist folder into a AWS S3 Bucket (http://vue-blog-devdekk.s3-website-ap-southeast-2.amazonaws.com/)




