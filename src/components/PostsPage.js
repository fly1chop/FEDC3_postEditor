import { request } from "./api.js";
import PostList from "./PostList.js";
import { push } from "./router.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement('div');

  const postList = new PostList({
    $target: $page,
    initialState: []
  })
  
  const $newPostButton = document.createElement('button');
  $newPostButton.textContent = 'New Post'
  $page.appendChild($newPostButton)

  $newPostButton.addEventListener('click', () => {
    push(`/posts/new`)
  })

  const fetchPosts = async () => {
    const posts = await request('/posts')
  
    postList.setState(posts)
  }

  this.render = async () => {
    await fetchPosts()
    $target.appendChild($page)
  }
  
}