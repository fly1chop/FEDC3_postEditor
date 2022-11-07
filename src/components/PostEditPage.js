import { getItem, setItem } from "./localStorage.js"
import { TEMP_POST_SAVE_KEY } from "./constants.js";
import { debounce } from "./util.js";
import Editor from "./Editor.js";
import { request } from "./api.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState

  const post = getItem(`${TEMP_POST_SAVE_KEY}-${this.state.postId}`, {
    title: "",
    content: "",
  });
  
  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: debounce((post) => {
      setItem(`${TEMP_POST_SAVE_KEY}-${this.state.postId}`, {
        ...post,
        tempSaveDate: new Date(),
      });
    }, 1000),
  });

  this.setState = async (nextState) => {
    if(this.state.postId !== nextState.postId){
      this.state = nextState;
      await fetchPost();
      return
    }
    
    this.state = nextState;
    this.render();

    editor.setState(this.state.post)
  }

  this.render = () => {
    $target.appendChild($page)
  }

  
  const fetchPost = async () => {
    const { postId } = this.state

    if(this.state !== 'new'){
      const post = await request(`/posts/${postId}`)

      this.setState({
        ...this.state,
        post
      })
    }
  }
}