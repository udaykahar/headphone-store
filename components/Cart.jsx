import React,{useRef}  from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContex'
import { urlFor } from '@/lib/client'
import getStripe from '../lib/getStripe'


const Cart = () => {
  const cartRef = useRef();
  const handleCheckout =async () => {
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
      items: cartItems.map((item)=>({
        quantity: item.quantity,
        sku: item._id,
      })),
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cart`,
    })
    if(error){
      toast.error(error.message)
    }
  }
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemsQuantity, onRemove} = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className="cart-heading"  onClick={()=>setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length === 0 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150}/>
              <h3>Your cart is empty</h3>
              <Link href="/">
                <button 
                className='btn'
                type='button'
                onClick={()=>setShowCart(false)}
                >
                  <span>Continue Shopping</span>
                </button>
              </Link>
            </div>
          )}
          <div className="product-container">
            {cartItems.length > 0 && cartItems.map((item)=>(
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} alt="product-image" className='cart-product-image' />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className='quantity-desc'>
                        <span className='minus' 
                        onClick={()=>toggleCartItemsQuantity(item._id, 'dec')
                        }
                        >
                          <AiOutlineMinus/></span>
                        <span className='num' >
                          {item.quantity}
                        </span>
                        <span className='plus' onClick={()=>
                          toggleCartItemsQuantity(item._id, 'inc')
                        }><AiOutlinePlus/></span>
                      </p>
                    </div>
                    <button
                    type='button'
                    className='remove-item'
                    onClick={()=>onRemove(item)}
                    >
                      <TiDeleteOutline/>
                    </button>
                  </div>
                </div>
              </div>  
            ))}
            {cartItems.length > 0 && (
             <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button 
                className='btn'
                type='button'
                onClink={handleCheckout}
                >
                  Checkout
                </button>
              </div>
             </div> 
            )}
          </div>
      </div>
    </div>
  )
}

export default Cart