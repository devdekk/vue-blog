import axios from 'axios'
import * as Auth0 from 'auth0-web'

const url = process.env.BACKEND_URL

class BlogPostsService {
  static getBlogPosts () {
    return new Promise(async (resolve, reject) => {
      try {

        const serverResponse = await axios.get(url)
        const unparsedData = serverResponse.data

        resolve(unparsedData.map(blogPost => ({
          ...blogPost,
          createdAt: new Date(blogPost.createdAt)
        })))

      } catch (error) {
        reject(error)
      }
    })
  }

  static insertBlogPost (text) {
    console.log(url)
    return axios.post(url, {
      text
    }, {
      headers: { 'Authorization': `Bearer ${Auth0.getAccessToken()}` }
    })
  }
}

export default BlogPostsService
