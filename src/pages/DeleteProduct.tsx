const DeleteProduct = () => {
  return (
    <>
      <main className="flex-col items-center justify-center px-30 py-10 mt-20 rounded-2xl bg-white max-w-1/2 mx-auto">
        <h2 className="header-large mb-8">Delete Product</h2>

        <div className="max-w-xl">
          <label className="mb-2 block">Select Product</label>

          <select className="mb-5 w-full border px-4 py-2">
            <option>Wireless Mouse</option>
            <option>Mechanical Keyboard</option>
            <option>USB-C Cable</option>
          </select>

          <button
            type="button"
            className="border px-5 py-2 hover:bg-black hover:text-white"
          >
            Delete Product
          </button>
        </div>
      </main>
    </>
  );
};

export default DeleteProduct;
