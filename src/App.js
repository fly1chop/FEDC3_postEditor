import PostsPage from "./components/PostsPage.js";

export default function App({ $target }) {

  const postsPage = new PostsPage({ $target })

  postsPage.render()
}
