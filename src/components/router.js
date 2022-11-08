import { ROUTE_CHANGE_CUSTOM_EVENT } from "./constants.js";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_CUSTOM_EVENT, (e) => {
    const { nextURL } = e.detail

    if(!nextURL) return;
    
    history.pushState(null, null, nextURL)
    onRoute()
  })
}

export const push = (nextURL) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_CUSTOM_EVENT, {
    detail: {
      nextURL
    }
  }))
}