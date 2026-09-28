const EditProduct = () => {
  return (
    <>
      <main className="flex-col items-center justify-center px-30 py-10 mt-20 rounded-2xl bg-white max-w-1/2 mx-auto">
        <h2 className="header-large mb-8">Edit Product</h2>

        <form className="max-w-xl space-y-5">
          <div>
            <label className="mb-2 block">Select Product</label>

            <select className="w-full border px-4 py-2">
              <option>Wireless Mouse</option>
              <option>Mechanical Keyboard</option>
              <option>USB-C Cable</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block">Product Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2"
              defaultValue="Wireless Mouse"
            />
          </div>

          <div>
            <label className="mb-2 block">Category</label>
            <input
              type="text"
              className="w-full border px-4 py-2"
              defaultValue="Accessories"
            />
          </div>

          <div>
            <label className="mb-2 block">Price</label>
            <input
              type="number"
              className="w-full border px-4 py-2"
              defaultValue="599"
            />
          </div>

          <div>
            <label className="mb-2 block">Stock</label>
            <input
              type="number"
              className="w-full border px-4 py-2"
              defaultValue="25"
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
    </>
  );
};

export default EditProduct;
