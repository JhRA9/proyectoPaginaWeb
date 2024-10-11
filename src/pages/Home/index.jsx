import { useContext } from "react";

import { Card } from "../../components/Card";
import { ProductDetail } from "../../components/ProductDetail";
import { ShoppingCartContext } from "../../contexts";

function Home() {
  const { setSearchByTitle, filteredItems } =
    useContext(ShoppingCartContext);


  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const renderView = ()=> {
    if(index){
      if (index === "men"){
        index = "men's clothing";
      } else if (index === "women"){
        index = "women's clothing";
      }
      return(
        filteredItems?.filter(item => item.category === index).map((item)=>(
          <Card key={item.id} {...item}/>))
      );
    }
    else {
      return(
        filteredItems?.map((item) => <Card key={item.id} {...item} />));
    }
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
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6 min-w-max  max-w-screen-lg">
      {renderView()}
      </div>
      <ProductDetail />
    </>
  );
}

export { Home };
