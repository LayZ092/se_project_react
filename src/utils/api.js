const baseUrl = "http://localhost:3001";

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
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

const addItem = async (item, token) => {
  const res = await fetch(`${baseUrl}/items`, {
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
  const res = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export { getItems, addItem, deleteItem, checkResponse };
