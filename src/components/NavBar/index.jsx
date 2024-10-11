import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ShoppingCartContext } from "../../contexts";
import { ShoppingCart } from "../ShoppingCart";

const Navbar = () => {
  const {signOut, account, saveSignOut, setCartProducts, setIsCheckoutSideMenuOpen, setSearchByTitle, setIsProductDetailOpen } =
    useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  const isUserSignOut = signOut;
  const hasUserAnAccount = Object.keys(account).length !== 0;

  const handleSignOut = () => {
    setCartProducts([]);
    setIsCheckoutSideMenuOpen();
    setIsProductDetailOpen(false);
    setSearchByTitle('');
    saveSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60 hidden tablet:hidden laptop:block desktop:block ">
            proyecto_prueba
          </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign out
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white shadow-sm">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>Shopi</NavLink>
        </li>
        <li className="hidden tablet:hidden laptop:block desktop:block ">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li className="hidden tablet:hidden laptop:block desktop:block ">
          <NavLink
            to="/men"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Men
          </NavLink>
        </li>
        <li className="hidden tablet:hidden laptop:block desktop:block ">
          <NavLink
            to="/women"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Women
          </NavLink>
        </li>
        <li className="hidden tablet:hidden laptop:block desktop:block ">
          <NavLink
            to="/electronics"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li className="hidden tablet:hidden laptop:block desktop:block ">
          <NavLink
            to="/jewelery"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
