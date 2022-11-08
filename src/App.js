import PostsPage from "./components/PostsPage.js";
import PostEditPage from "./components/PostEditPage.js";
import { initRouter } from "./components/router.js";

// url 규칙
// root: postPage 그리기

// `/posts/${id}` - id에 해당하는 post 생성
// `/posts/new` - 새 post 생성

export default function App({ $target }) {
  const postsPage = new PostsPage({ 
    $target
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: '',
        content: ''
      }
    },
  });

  this.route = () => {
    $target.innerHTML = ``
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.render();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
