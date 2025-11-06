import { BASE_URL } from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    const errorMsg = err.message || res.statusText || `Error: ${res.status}`;
    return Promise.reject(`Error ${res.status}: ${errorMsg}`);
  });
}

function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

const addItem = async (item, token) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return checkResponse(res);
};

const deleteItem = async (itemId, token) => {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

const addCardLike = async (id, token) => {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

const removeCardLike = async (id, token) => {
  const res = await fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export {
  getItems,
  addItem,
  deleteItem,
  checkResponse,
  addCardLike,
  removeCardLike,
};
