import { ChevronRightIcon, CalendarDaysIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <div className="flex justify-between w-full">
        <p className="flex flex-col">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-4 w-4 text-black" />
            <span className="font-light">01.02.23</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingBagIcon className="h-4 w-4 text-black" />
            <span className="font-light">{totalProducts} articles</span>
          </div>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </p>
      </div>
    </div>
  );
};

export { OrdersCard };
