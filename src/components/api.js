import { API_END_POINT } from "./constants.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-type': 'application/json',
      }
    })

    if(!res.ok) throw new Error(`Could not fetch data (${res.status})`);

    return await res.json();
    
  } catch(e) {
    alert(e.message)
  }
}