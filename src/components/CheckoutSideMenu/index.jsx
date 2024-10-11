import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";
import { OrderCard } from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const {
    isCheckoutSideMenuOpen,
    setIsCheckoutSideMenuOpen,
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setSearchByTitle,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id != id);
    setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.02.23",
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setIsCheckoutSideMenuOpen(false);
    setSearchByTitle('');
  };

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? "flex" : "hidden"
      } flex-col fixed right-0 border border-black rounded-lg bg-white w-[360px] h-[calc(100vh-82px)] top-17`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => setIsCheckoutSideMenuOpen(false)}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-2">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="bg-black py-3 text-white w-full rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export { CheckoutSideMenu };
