class PostService {

  getAll() {
    return fetch('https://api.jonathanearl.localhost/posts')
      .then(res => res.json())
  }
}

export default new PostService();