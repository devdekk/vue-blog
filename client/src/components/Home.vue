<template>
<div>
  <b-navbar toggleable="sm" type="dark" variant="primary">
    <b-navbar-brand tag="h1" class="mb-0">
     Blog-Auth0-MongoDB
    </b-navbar-brand>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!profile" >
                <button class="btn btn-light" v-on:click="signIn">
                  Sign In
                </button>
            </li>
            <li class="nav-item" v-if="profile" >
                <button class="btn btn-light" v-on:click="signOut">
                  Sign Out
                </button>
            </li>
        </ul>
  </b-navbar>
    
  <p class="error" v-if="error">{{ error }}</p>
  <div class="container">
  <div v-if="profile" class="user-input">
      <div class="row">
        <div class="col-sm-2">
          <img :src="profile.picture">    
        </div>
        <div style="text-align: left" class="col-sm-10">
         <h5> Welcome, {{ profile.given_name }}!   </h5>
         <div class="row">
           <div class="col-sm-12">
             <div class="input-group mb-3">
              <input id="input-message" class="form-control" v-model="text" placeholder="Write your blog post here..."/>   
                <div class="input-group-append">
                <button class="btn btn-primary" v-on:click="addMessage">Add Post</button>  
                </div>
              </div>
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <transition-group name="list" enter-active-class="animated fadeIn" 
                                    leave-active-class="animated fadeOut">
    <ul class="list-group mb-3 row list-group-hover"  v-for="(blogPost, key) in blogPosts.slice().reverse()" :key="key">
          <li class="list-group-item" >
              <div class="row">
                <div class="col-sm-2">
                    <img :src="blogPost.author.picture">
                </div>
                <div class="col-sm-8">
                    <h5>{{ blogPost.text }} </h5>
                    <div class="row">
                      <div class="col-sm-12">
                          <h6 class="text-muted"> - {{ blogPost.author ? blogPost.author.name : 'Unknown' }} </h6>
                      </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <small  class="text-muted"> {{ `${blogPost.createdAt.getDate()}/${blogPost.createdAt.getMonth() + 1}/${blogPost.createdAt.getFullYear()}` }}</small>
                </div>
              </div>
          </li>
        </ul>
    </transition-group>
  </div>
</div>
</template>

<script>
// Import bootstrap CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as Auth0 from 'auth0-web'
import BlogPostsService from '../BlogPostsService'

export default {
  name: 'Home',
  data () {
    return {
      blogPosts: [],
      error: '',
      profile: null,
      text: ''
    }
  },
  async created () {
    try {

      // get blog posts
      this.getPosts()

      // get profile details if logged in
      Auth0.subscribe(() => {
        this.profile = Auth0.getProfile()
      })
    } catch (error) {
      // log errors
      this.error = error.message
    }
  },
  methods: {
    signIn: Auth0.signIn,
    signOut () {
      Auth0.signOut({
        clientID: process.env.AUTH0_CLIENT_ID,
        returnTo: process.env.AUTH0_LOGOUT_URL
      })
    },
    async getPosts (){
      this.blogPosts = await BlogPostsService.getBlogPosts()
    },
    async addMessage () {
      await BlogPostsService.insertBlogPost(this.text)
      this.text = ''
      this.getPosts()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

div.container {
  padding-top: 20px;
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.user-input {
  position: relative;
  padding:10px;
  background-color: white;
}

div.profile-pic {
  height: 20px;
  width: 20px;
  padding: 10px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

ul li.list-group-item {
    margin-bottom: 2px;
    color: #3E5252;
    box-shadow: 3px 2px 4px #4285F4;
}

img {
    height:50px;
    width: 50px;
    border-radius: 50%;
    box-shadow: 3px 2px 4px #0d47a1;
}

.list-group-hover .list-group-item:hover {
    box-shadow: 3px 2px 4px orange;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
