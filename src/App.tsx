import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit" element={<EditProduct />} />
        <Route path="/delete" element={<DeleteProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
