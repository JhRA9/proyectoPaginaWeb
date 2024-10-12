import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ShoppingCartContext } from "../../contexts";
import { ShoppingCart } from "../ShoppingCart";
import CategorySlide from './CategorySlide';

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
            proyectoPaginaWEB
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

// CategorySlide.jsx
import React from 'react';

const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home', 'Toys'];

const CategorySlide = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-slide flex overflow-x-auto mb-4">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-item p-2 m-2 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySlide;

// Home.jsx
import React, { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import Card from '../../components/Card';
import ProductDetail from '../../components/ProductDetail';

function Home() {
  const { setSearchByTitle, filteredItems } = useContext(ShoppingCartContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const renderView = () => {
    let itemsToRender = filteredItems;

    if (selectedCategory !== 'All') {
      itemsToRender = itemsToRender?.filter(item => item.category === selectedCategory);
    }

    // Limitar a 16 elementos
    itemsToRender = itemsToRender?.slice(0, 16);

    return itemsToRender?.map((item) => (
      <Card key={item.id} {...item} />
    ));
  }

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        type="text"
        placeholder="Search a product"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
      <CategorySlide selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6 min-w-max max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </>
  );
}

export { Home };
