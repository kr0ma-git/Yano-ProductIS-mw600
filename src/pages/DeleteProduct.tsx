import { useEffect, useState } from "react";

interface Product {
  ID: number;
  NAME: string;
  CATEGORY: string;
  PRICE: number;
  STOCK: number;
}

const DeleteProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
          setSelectedId(data[0].ID);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async () => {
    if (selectedId === null) {
      return;
    }

    const product = products.find((product) => product.ID === selectedId);

    if (!product) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.NAME}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${selectedId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully!");

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.ID !== selectedId),
      );

      setSelectedId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <main className="flex-col items-center justify-center px-30 py-10 mt-20 rounded-2xl bg-white max-w-1/2 mx-auto">
      <h2 className="header-large mb-8">Delete Product</h2>

      <div className="max-w-xl">
        <label className="mb-2 block">Select Product</label>

        <select
          className="mb-5 w-full border px-4 py-2"
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          disabled={products.length === 0}
        >
          {products.length === 0 ? (
            <option value="">No products available</option>
          ) : (
            products.map((product) => (
              <option key={product.ID} value={product.ID}>
                {product.NAME}
              </option>
            ))
          )}
        </select>

        <button
          type="button"
          onClick={handleDelete}
          disabled={selectedId === null}
          className="border px-5 py-2 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Delete Product
        </button>
      </div>
    </main>
  );
};

export default DeleteProduct;
