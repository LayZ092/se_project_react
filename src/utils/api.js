const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

const addItem = async (item) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

const deleteItem = async (itemId) => {
  const response = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
  return response.json();
};

export { getItems, addItem, deleteItem };
