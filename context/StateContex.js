import React, { createContext, useState, useContext } from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const toggleCartItemsQuantity = (id, value) => {
        index = cartItems.findIndex((item) => item._id === id);
        foundProduct = cartItems[index];
        if (value === 'inc') {
            foundProduct.quantity += 1;
            setTotalQuantities((totalQuantities) => totalQuantities + 1);
            setTotalPrice((totalPrice) => totalPrice + foundProduct.price);
        }
        if (value === 'dec') {
            foundProduct.quantity -= 1;
            setTotalQuantities((totalQuantities) => totalQuantities - 1);
            setTotalPrice((totalPrice) => totalPrice - foundProduct.price);
        }
        if (foundProduct.quantity === 0) {
            onRemove(foundProduct);
        } else {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index] = foundProduct;
            setCartItems(updatedCartItems);
        }
    }

    const incQty = () => {
        setQty(qty + 1);
    }
    

    const decQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    const onAdd = (product, quantity) => {
        const exist = cartItems.find((item) => item._id === product._id);
        setTotalPrice((totalPrice) => totalPrice + product.price * quantity);
        setTotalQuantities((totalQuantities) => totalQuantities + quantity);

        if (exist) {
            const updatedCartItems = cartItems.map((cartProduct) =>
                cartProduct._id === product._id ? { ...cartProduct, quantity: cartProduct.quantity + quantity } : cartProduct
            );
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to cart`);
    };

    const onRemove = (product) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== product._id);
        setCartItems(updatedCartItems);
        setTotalPrice((totalPrice) => totalPrice - product.price * product.quantity);
        setTotalQuantities((totalQuantities) => totalQuantities - product.quantity);
    };
    
    return (
        <Context.Provider value={
            {
                showCart, 
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemsQuantity,
                onRemove
            }
        }>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);
