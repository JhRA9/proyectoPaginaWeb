import { useContext } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../contexts'


const ShoppingCart = () => {
  const {cartProducts,setIsCheckoutSideMenuOpen,setIsProductDetailOpen } = useContext(ShoppingCartContext)

  const openCheckoutSideMenu = () => {
    setIsProductDetailOpen(false);
    setIsCheckoutSideMenuOpen(true);
  }

  return (
    <div className='relative flex gap-0.5 items-center' onClick={() => openCheckoutSideMenu()}>
      <ShoppingCartIcon className='w-6 h-6 fill-none stroke-black cursor-pointer'/>
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
      rounded-full bg-black w-4 h-4 text-xs text-white'>
        {cartProducts.length}
      </div>
    </div>
  )
}

export {ShoppingCart}