import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function retrieveProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const result = await response.json();

      setProducts(result);
    } catch (err) {
      console.log("Fetching error: ", err);
    }
  }

  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <>
      <main className="px-30 py-10">
        <div className="mb-8">
          <h2 className="header-large">Products</h2>
          <p className="mt-2 text-gray-600">View all available products.</p>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="border px-4 py-3 text-left">ID</th>
              <th className="border px-4 py-3 text-left">Product</th>
              <th className="border px-4 py-3 text-left">Category</th>
              <th className="border px-4 py-3 text-left">Price</th>
              <th className="border px-4 py-3 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b bg-white">
                <td className="border px-4 py-3">{product.id}</td>
                <td className="border px-4 py-3">{product.name}</td>
                <td className="border px-4 py-3">{product.category}</td>
                <td className="border px-4 py-3">
                  ₱{product.price.toLocaleString()}
                </td>
                <td className="border px-4 py-3">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Home;
