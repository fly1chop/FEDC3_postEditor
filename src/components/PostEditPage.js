import { getItem, removeItem, setItem } from "./localStorage.js"
import { debounce } from "./util.js";
import Editor from "./Editor.js";
import { request } from "./api.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState

  let postLocalSaveKey = `temp-post-${this.state.postId}`

  const post = getItem(postLocalSaveKey, {
    title: '',
    content: '',
  });
  
  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: debounce((post) => {
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });
    }, 1000),
  });

  this.setState = async (nextState) => {
    if(this.state.postId !== nextState.postId){
      postLocalSaveKey = `temp-post-${nextState.postId}`
      this.state = nextState;
      await fetchPost();
      return
    }
    
    this.state = nextState;
    this.render();
 
    editor.setState(this.state.post || {
      title: '',
      content: ''
    })
  }

  this.render = () => {
    $target.appendChild($page)
  }

  
  const fetchPost = async () => {
    const { postId } = this.state

    if(this.state !== 'new'){
      const post = await request(`/posts/${postId}`)

      const tempPost = getItem(postLocalSaveKey, {
        title: '',
        content: '',
      });

      if(tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if(confirm('Unsaved work found; would you like to retrieve?')){
          this.setState({
            ...this.state,
            post: tempPost
          })
          return
        } else {
          removeItem(postLocalSaveKey);
          this.setState({
            ...this.state,
            post
          })
          return
        }
      }

      this.setState({
        ...this.state,
        post
      })
    }
  }
}