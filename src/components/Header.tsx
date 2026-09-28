import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b-2 px-30 py-5">
      <h1 className="header-large">Product MIS</h1>

      <nav className="flex gap-6">
        <NavLink to="/">Products</NavLink>
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/edit">Edit</NavLink>
        <NavLink to="/delete">Delete</NavLink>
      </nav>
    </header>
  );
};

export default Header;
