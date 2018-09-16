<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as Auth0 from 'auth0-web'
// Import bootstrap CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  created () {
    Auth0.configure({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      audience: 'https://blog-api',
      redirectUri: process.env.AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid profile'
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
