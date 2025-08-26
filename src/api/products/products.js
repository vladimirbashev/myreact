const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      title: product.title,
      price: Number(product.price),
      description: product.description || "No description",
      image: product.image || "https://via.placeholder.com/150",
      category: product.category || "general",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function updateProduct(product) {
  const res = await fetch(`${API_URL}/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

// удалить продукт
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
