import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const EditProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data: Product[] = await response.json();

        setProducts(data);

        if (data.length > 0) {
          const firstProduct = data[0];

          setSelectedId(firstProduct.id);
          setName(firstProduct.name);
          setCategory(firstProduct.category);
          setPrice(String(firstProduct.price));
          setStock(String(firstProduct.stock));
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);

    const product = products.find((product) => product.id === id);

    if (!product) {
      return;
    }

    setSelectedId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedId === null) {
      return;
    }

    const updatedProduct = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      alert("Product updated successfully!");

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === selectedId
            ? {
                ...product,
                ...updatedProduct,
              }
            : product,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <main className="flex-col items-center justify-center px-30 py-10 mt-20 rounded-2xl bg-white max-w-1/2 mx-auto">
      <h2 className="header-large mb-8">Edit Product</h2>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="mb-2 block">Select Product</label>

          <select
            className="w-full border px-4 py-2"
            value={selectedId ?? ""}
            onChange={handleProductChange}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block">Product Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block">Category</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block">Price</label>
          <input
            type="number"
            className="w-full border px-4 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">Stock</label>
          <input
            type="number"
            className="w-full border px-4 py-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
            step="1"
            required
          />
        </div>

        <button
          type="submit"
          className="border px-5 py-2 hover:bg-black hover:text-white"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditProduct;
