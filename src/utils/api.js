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

const addItem = async (item) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return checkResponse(response);
};

const deleteItem = async (itemId) => {
  const response = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
  return checkResponse(response);
};

export { getItems, addItem, deleteItem, checkResponse };
