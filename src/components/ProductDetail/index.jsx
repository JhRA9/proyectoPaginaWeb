import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";

const ProductDetail = () => {
  const { productToShow, isProductDetailOpen, setIsProductDetailOpen } = useContext(ShoppingCartContext);

  return (
    <aside 
        className= {`${isProductDetailOpen ? 'flex' : 'hidden'} flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-68px)] top-17`}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XMarkIcon
            onClick={ () => setIsProductDetailOpen(false) }
            className="h-6 w-6 text-black" />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={productToShow.image}
          alt={productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">
          ${productToShow.price}
        </span>
        <span className="font-medium text-md mb-6">
          ${productToShow.title}
        </span>
        <span className="font-light text-sm">
          ${productToShow.description}
        </span>
      </p>
    </aside>
  );
};

export { ProductDetail };
