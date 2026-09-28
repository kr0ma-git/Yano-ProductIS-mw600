import { useState } from "react";
import type { FormEvent } from "react";

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

const AddProduct = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product: Product = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added successfully!");

      setName("");
      setCategory("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <main className="flex-col items-center justify-center px-30 py-10 mt-20 rounded-2xl bg-white max-w-1/2 mx-auto">
      <h2 className="header-large mb-8">Add Product</h2>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div>
          <label className="mb-2 block">Product Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
            placeholder="Enter product name"
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
            placeholder="Enter category"
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
            placeholder="Enter price"
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
            placeholder="Enter stock quantity"
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
          Add Product
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
